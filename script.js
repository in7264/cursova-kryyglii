function showConfigurator(carModel) {
  document.getElementById('configurator').classList.remove('hidden');
  document.getElementById('car-model').innerText = 'Модель: ' + carModel;
}


function saveFeedback(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Створіть об'єкт для зберігання даних
  const feedbackData = {
    name,
    email,
    message,
  };

  // Зберігайте дані у форматі JSON (ви можете використовувати Node.js або інші середовища)
  const jsonData = JSON.stringify(feedbackData);

  // Очищайте форму
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';

  // Виводьте JSON-дані в консоль (ви можете замінити це на логіку зберігання на сервері)
  console.log(jsonData);
}

function sendCarInfo(selectedCarModel) {
  // Зберігаємо обрану модель у локальному сховищі
  localStorage.setItem('selectedCarModel', selectedCarModel);

  // Переходимо на сторінку configurator.html
  window.location.href = 'configurator.html';
}
// Додайте цю функцію на головній сторінці для переадресації до конфігуратора зі збереженням моделі в URL
function goToConfigurator(model) {
  // Зберегти назву моделі в локальному сховищі
  localStorage.setItem('selectedModel', model);
  
  // Перейти на сторінку конфігуратора
  window.location.href = 'configurator.html';
}
