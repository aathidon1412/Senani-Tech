<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method " . $_SERVER['REQUEST_METHOD'] . " Not Allowed"]);
    exit;
}

// Simple .env parser to read SMTP configurations
function get_env_var($key, $default = null) {
    // 1. Check system environment
    $val = getenv($key);
    if ($val !== false) return $val;
    if (isset($_ENV[$key])) return $_ENV[$key];
    if (isset($_SERVER[$key])) return $_SERVER[$key];

    // 2. Check local .env file in parent directories
    $paths = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../.env',
        __DIR__ . '/.env',
    ];
    foreach ($paths as $path) {
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) continue;
                
                $parts = explode('=', $line, 2);
                if (count($parts) === 2) {
                    $name = trim($parts[0]);
                    $value = trim($parts[1]);
                    $value = trim($value, '"\''); // Strip quotes
                    if ($name === $key) {
                        return $value;
                    }
                }
            }
        }
    }
    return $default;
}

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);
$name = $input['name'] ?? null;
$email = $input['email'] ?? null;
$phone = $input['phone'] ?? null;
$message = $input['message'] ?? null;
$attachment = $input['attachment'] ?? null;
$attachmentName = $input['attachmentName'] ?? null;

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields (name, email, message)."]);
    exit;
}

// SMTP configurations
$host = get_env_var('SMTP_HOST');
$portStr = get_env_var('SMTP_PORT');
$user = get_env_var('SMTP_USER');
$pass = get_env_var('SMTP_PASS');
$from = get_env_var('SMTP_FROM', '"SenaniTech Contact Form" <' . $user . '>');
$to = get_env_var('SMTP_TO', 'info@senanitech.com');

if (!$host || !$portStr || !$user || !$pass) {
    http_response_code(500);
    echo json_encode(["error" => "Server is currently unable to send emails due to missing configuration."]);
    exit;
}

$port = intval($portStr);

// Text message body
$text_body = "
You have received a new message from the SenaniTech contact form:

Name: $name
Email: $email
Phone: " . ($phone ?: 'Not provided') . "

Message:
$message
";

// HTML message body
$html_body = '
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
  <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">
    New Message from Contact Form
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
      <td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($name) . '</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
      <td style="padding: 8px 0; color: #0f172a;">
        <a href="mailto:' . urlencode($email) . '" style="color: #3b82f6; text-decoration: none;">' . htmlspecialchars($email) . '</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
      <td style="padding: 8px 0; color: #0f172a;">' . ($phone ? htmlspecialchars($phone) : '<i>Not provided</i>') . '</td>
    </tr>
  </table>
  <div style="margin-top: 20px; padding: 15px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #f1f5f9;">
    <h3 style="margin-top: 0; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
      Message Content
    </h3>
    <p style="color: #0f172a; line-height: 1.6; white-space: pre-wrap; margin-bottom: 0;">' . htmlspecialchars($message) . '</p>
  </div>
</div>
';

try {
    $encryption = ($port === 465) ? 'ssl://' : '';
    $socket = fsockopen($encryption . $host, $port, $errno, $errstr, 15);
    
    if (!$socket) {
        throw new Exception("Could not connect to SMTP host: $errstr ($errno)");
    }

    $read = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) == ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $read(); // SMTP Greeting
    $send("EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    
    // Authenticate
    $send("AUTH LOGIN");
    $send(base64_encode($user));
    $send(base64_encode($pass));

    $send("MAIL FROM: <" . $user . ">");
    $send("RCPT TO: <" . $to . ">");
    $send("DATA");

    $boundary = md5(uniqid(time()));
    
    // Headers
    $headers = [
        "From: $from",
        "To: $to",
        "Reply-To: $email",
        "Subject: $subject",
        "MIME-Version: 1.0",
        "Content-Type: multipart/mixed; boundary=\"$boundary\"",
        "X-Mailer: PHP/" . phpversion()
    ];

    $body_parts = [];
    
    // Text representation
    $body_parts[] = "--$boundary";
    $body_parts[] = "Content-Type: text/plain; charset=UTF-8";
    $body_parts[] = "Content-Transfer-Encoding: 7bit";
    $body_parts[] = "";
    $body_parts[] = $text_body;

    // HTML representation
    $body_parts[] = "--$boundary";
    $body_parts[] = "Content-Type: text/html; charset=UTF-8";
    $body_parts[] = "Content-Transfer-Encoding: 7bit";
    $body_parts[] = "";
    $body_parts[] = $html_body;

    // Attachment
    if ($attachment && $attachmentName) {
        $body_parts[] = "--$boundary";
        $body_parts[] = "Content-Type: application/octet-stream; name=\"" . basename($attachmentName) . "\"";
        $body_parts[] = "Content-Transfer-Encoding: base64";
        $body_parts[] = "Content-Disposition: attachment; filename=\"" . basename($attachmentName) . "\"";
        $body_parts[] = "";
        $body_parts[] = chunk_split($attachment);
    }

    $body_parts[] = "--$boundary--";

    $email_raw = implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", $body_parts);
    
    $send($email_raw);
    $send(".");
    $send("QUIT");
    fclose($socket);

    echo json_encode(["success" => true, "message" => "Message sent successfully!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send your message. Technical details: " . $e->getMessage()]);
}
