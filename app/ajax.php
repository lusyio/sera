<?php
if (!isset($_POST['action'])) {
    exit();
}
include 'conf.php';

if ($_POST['action'] === 'offer') {
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $data = [
        'bot_token' => $telegramApiKey,
        'method' => 'sendMessage',
        'args' => json_encode([
            'chat_id' => $telegramOfferChatId,
            'parse_mode' => 'Markdown',
            'text' => "На цэра.рф оставил заявку с номером телефона " . $phone .
                " пользователь с именем *" . $name . "* и сообщением *" . $message . "*",
        ]),
    ];
    $url = $telegramProxyUrl;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_exec($curl);
    curl_close($curl);
}
