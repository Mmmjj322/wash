<?php

header('Content-Type: application/json; charset=utf-8');

$config = parse_ini_file('/home/m/masteuez/remont-stir-machin.site/telegram.env');

if ($config === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Не удалось загрузить конфигурацию'
    ]);
    exit;
}

$botToken = $config['TELEGRAM_BOT_TOKEN'] ?? '';
$chatId   = $config['TELEGRAM_CHAT_ID'] ?? '';

if ($botToken === '' || $chatId === '') {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Telegram configuration is missing'
    ]);
    exit;
}
$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$model = trim($_POST['model'] ?? '');
$problem = trim($_POST['problem'] ?? '');
$date = trim($_POST['date'] ?? '');

if ($name === '' ||  $phone === '') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Заполните имя и телефон'
    ]);

    exit;
}

$message = "🔔 <b>Новая заявка с сайта</b>\n\n";

$message .= "👤 <b>Имя:</b> " . htmlspecialchars($name) . "\n";
$message .= "📞 <b>Телефон:</b> " . htmlspecialchars($phone) . "\n";

if ($email !== '') {
    $message .= "📧 <b>Email:</b> " . htmlspecialchars($email) . "\n";
}

if ($model !== '') {
    $message .= "🧺 <b>Модель:</b> " . htmlspecialchars($model) . "\n";
}

if ($problem !== '') {
    $message .= "🔧 <b>Проблема:</b> " . htmlspecialchars($problem) . "\n";
}

if ($date !== '') {
    $message .= "📅 <b>Дата выезда:</b> " . htmlspecialchars($date) . "\n";
}

$message .= "\n🌐 <b>Источник:</b> wasch-repair.com";

$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

$data = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10
]);

$response = curl_exec($ch);
$error = curl_error($ch);

curl_close($ch);

if ($error) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Ошибка отправки'
    ]);

    exit;
}

$result = json_decode($response, true);

if (!$result || !$result['ok']) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Telegram API error'
    ]);

    exit;
}

echo json_encode([
    'success' => true
]);
