<?php
/**
 * Wedding RSVP – append guest(s) to data/joiners.json.
 * Upload this file and the data/ folder to your Hostinger public_html (same level as index.html).
 * Ensure data/ is writable: chmod 755 data (or 775 if needed).
 *
 * POST body (JSON): { "joiners": [ { "name": "Jane", "lastname": "Doe" }, ... ] }
 * Response (JSON): { "ok": true } or { "ok": false, "error": "..." }
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!isset($data['joiners']) || !is_array($data['joiners'])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing or invalid joiners array']);
  exit;
}

$dir = __DIR__ . '/data';
$file = $dir . '/joiners.json';

if (!is_dir($dir)) {
  if (!@mkdir($dir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not create data directory']);
    exit;
  }
}

$existing = [];
if (is_file($file)) {
  $content = @file_get_contents($file);
  if ($content !== false) {
    $decoded = json_decode($content, true);
    $existing = is_array($decoded) ? $decoded : [];
  }
}

$nextId = 1;
foreach ($existing as $row) {
  if (isset($row['id']) && is_numeric($row['id'])) {
    $nextId = max($nextId, (int)$row['id'] + 1);
  }
}

foreach ($data['joiners'] as $j) {
  $name = isset($j['name']) ? trim((string)$j['name']) : '';
  $lastname = isset($j['lastname']) ? trim((string)$j['lastname']) : '';
  if ($name === '' && $lastname === '') continue;
  $existing[] = [
    'id' => (string)$nextId,
    'name' => $name,
    'lastname' => $lastname,
  ];
  $nextId++;
}

$json = json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($json === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'JSON encode failed']);
  exit;
}

if (@file_put_contents($file, $json) === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Could not write file. Check data/ folder permissions (e.g. chmod 755 or 775).']);
  exit;
}

echo json_encode(['ok' => true]);
