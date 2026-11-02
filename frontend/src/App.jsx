import { useState, useEffect } from 'react'
import { sendUserAction } from './api'

export default function App() {
  const [inputText, setInputText] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [notificationPeriod, setNotificationPeriod] = useState('')

  // Debounce для текстового поля: шлем событие через 600мс после окончания ввода
  useEffect(() => {
    if (!inputText) return;

    const timer = setTimeout(() => {
      sendUserAction('input_change', 'search_input', inputText);
    }, 600);

    return () => clearTimeout(timer);
  }, [inputText]);

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedRole(val);
    sendUserAction('select_change', 'role_select', val);
  };

  const handleCheckboxChange = (e) => {
    const val = e.target.checked;
    setIsChecked(val);
    sendUserAction('checkbox_toggle', 'subscribe_checkbox', val);
  };

  const handleRadioChange = (e) => {
    const val = e.target.value;
    setNotificationPeriod(val);
    sendUserAction('radio_select', 'notification_frequency', val);
  };

  const sectionStyle = {
    backgroundColor: '#ffffff',
    padding: '1.25rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '1.1rem',
    marginBottom: '0.75rem',
    color: '#374151',
  };

  return (
    <main style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>User Action Tracker</h1>

      {/* 1. Инпут */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>1. Текстовое поле ввода</h2>
        <input
          type="text"
          placeholder="Введите поисковый запрос..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
        />
      </section>

      {/* 2. Селект */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>2. Выпадающий список</h2>
        <select
          value={selectedRole}
          onChange={handleSelectChange}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="">-- Выберите роль --</option>
          <option value="developer">Developer</option>
          <option value="devops">DevOps</option>
          <option value="qa">QA Engineer</option>
        </select>
      </section>

      {/* 3. Чекбокс */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>3. Флажок согласия</h2>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span>Получать дайджест активности на email</span>
        </label>
      </section>

      {/* 4. Радиокнопки */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>4. Частота уведомлений</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['instantly', 'daily', 'weekly'].map((val) => (
            <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="notification_frequency"
                value={val}
                checked={notificationPeriod === val}
                onChange={handleRadioChange}
              />
              <span style={{ textTransform: 'capitalize' }}>{val}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
  );
}