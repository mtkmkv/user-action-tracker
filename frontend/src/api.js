const API_URL = 'http://localhost:8080/api/v1/events';

// Генерируем или берем ID сессии, чтобы отличать пользователя
const sessionId = 'sess_' + Math.random().toString(36).substring(2, 9);

export async function sendUserAction(eventType, targetElement, value) {
  const payload = {
    sessionId: sessionId,
    eventType: eventType,         // например, 'radio_select', 'input_change'
    targetElement: targetElement, // имя элемента: 'notification_frequency', 'search_input'
    value: String(value),         // значение
    timestamp: new Date().toISOString()
  };

  try {
    // Отправляем без блокировки интерфейса (fire-and-forget)
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Если бэкенд пока не запущен — просто выводим предупреждение в консоль
    console.warn('Collector service is offline:', err.message);
  }
}