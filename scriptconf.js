document.addEventListener("DOMContentLoaded", function() {
    // Ваш URL до JSON-файлу
    const jsonUrl = "cars.json";
  
    // Отримання моделі авто з параметрів URL (наприклад, "?model=e-tron GT")
    const selectedModel = localStorage.getItem('selectedModel');
  
    // Тепер ви можете використовувати змінну selectedModel для отримання обраної моделі
    console.log(selectedModel);

    // Запит на отримання JSON-даних
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const selectedCar = data.cars.find(car => car.model === selectedModel);
  
        // Встановлення назви моделі та базової ціни
        document.getElementById("car-model").innerText = `Модель: ${selectedCar.model}`;
        document.getElementById("base-price").innerText = `Базова ціна: $${selectedCar.basePrice.toFixed(2)}`;
  
        // Додавання опцій до селекторів
        addOptionsToSelect("engineConfig", selectedCar.configurations.find(conf => conf.configurationType === "Двигун/привод").configurations);
        addOptionsToSelect("exteriorConfig", selectedCar.configurations.find(conf => conf.configurationType === "Екстер'єр").configurations);
        addOptionsToSelect("wheelsConfig", selectedCar.configurations.find(conf => conf.configurationType === "Екстер'єр - Диски").configurations);
        addOptionsToSelect("interiorConfig", selectedCar.configurations.find(conf => conf.configurationType === "Інтер'єр").configurations);
        addOptionsToSelect("interiorColorConfig", selectedCar.configurations.find(conf => conf.configurationType === "Інтер'єр - Колір").configurations);
      })
      .catch(error => console.error("Error fetching data:", error));
  });
  
  function addOptionsToSelect(selectId, configurations) {
    const select = document.getElementById(selectId);
    configurations.forEach(config => {
      const option = document.createElement("option");
      option.value = config.name;
      option.text = `${config.name} (+$${config.price.toFixed(2)})`;
      select.appendChild(option);
    });
  }
  
  async function calculatePrice() {
    const carModel = localStorage.getItem('selectedModel');

    
    // Отримати базову ціну для обраної машини
    const basePriceElement = document.getElementById('base-price');
    const basePriceText = basePriceElement.innerText;
    const basePriceMatch = basePriceText.match(/\$([\d,]+(\.\d{1,2})?)/); // Витягти цифри з тексту
    const basePrice = parseFloat(basePriceMatch[1].replace(',', ''));

    // Отримайте обрані опції для кожного селектора
    const selectedEngine = document.getElementById("engineConfig").value;
    const selectedExterior = document.getElementById("exteriorConfig").value;
    const selectedWheels = document.getElementById("wheelsConfig").value;
    const selectedInterior = document.getElementById("interiorConfig").value;
    const selectedInteriorColor = document.getElementById("interiorColorConfig").value;
  
    // Отримайте ціни для кожної обраної опції
    const enginePrice = await getOptionPrice(carModel, 'Двигун/привод', selectedEngine);
    const exteriorPrice = await getOptionPrice(carModel, 'Екстер\'єр', selectedExterior);
    const wheelsPrice = await getOptionPrice(carModel, 'Екстер\'єр - Диски', selectedWheels);
    const interiorPrice = await getOptionPrice(carModel, 'Інтер\'єр', selectedInterior);
    const interiorColorPrice = await getOptionPrice(carModel, 'Інтер\'єр - Колір', selectedInteriorColor);
  
    // Обчисліть загальну ціну, додавши всі ціни разом
    const totalPrice = basePrice + enginePrice + exteriorPrice + wheelsPrice + interiorPrice + interiorColorPrice;
  
    // Відобразіть загальну ціну на сторінці
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.innerText = `Загальна ціна: $${totalPrice.toFixed(2)}`;
  }
  
// Представте, що це URL до вашого сервера або локального JSON-файлу
const jsonUrl = 'cars.json';

// Функція для отримання ціни опції за назвою моделі та типом конфігурації
async function getOptionPrice(model, configType, configName) {
  try {
    // Отримати дані з сервера або локального JSON-файлу
    const response = await fetch(jsonUrl);
    const data = await response.json();

    // Знайти модель за назвою
    const car = data.cars.find(car => car.model === model);

    // Знайти тип конфігурації за назвою
    const configurationType = car.configurations.find(config => config.configurationType === configType);

    // Знайти конфігурацію за іменем
    const configuration = configurationType.configurations.find(config => config.name === configName);
    
    // Повернути ціну
    return configuration.price;
  } catch (error) {
    console.error('Помилка отримання даних з JSON:', error);
    return 0; // Повертаємо 0 у випадку помилки
  }
}


async function sendEmail() {

    const carModel = localStorage.getItem('selectedModel');

    
    // Отримати базову ціну для обраної машини
    const basePriceElement = document.getElementById('base-price');
    const basePriceText = basePriceElement.innerText;
    const basePriceMatch = basePriceText.match(/\$([\d,]+(\.\d{1,2})?)/); // Витягти цифри з тексту
    const basePrice = parseFloat(basePriceMatch[1].replace(',', ''));
    

    // Отримайте обрані опції для кожного селектора
    const selectedEngine = document.getElementById("engineConfig").value;
    const selectedExterior = document.getElementById("exteriorConfig").value;
    const selectedWheels = document.getElementById("wheelsConfig").value;
    const selectedInterior = document.getElementById("interiorConfig").value;
    const selectedInteriorColor = document.getElementById("interiorColorConfig").value;
  
    // Отримайте ціни для кожної обраної опції
    const enginePrice = await getOptionPrice(carModel, 'Двигун/привод', selectedEngine);
    const exteriorPrice = await getOptionPrice(carModel, 'Екстер\'єр', selectedExterior);
    const wheelsPrice = await getOptionPrice(carModel, 'Екстер\'єр - Диски', selectedWheels);
    const interiorPrice = await getOptionPrice(carModel, 'Інтер\'єр', selectedInterior);
    const interiorColorPrice = await getOptionPrice(carModel, 'Інтер\'єр - Колір', selectedInteriorColor);

    const phoneNumber = document.getElementById("phoneNumber").value;
    if (!phoneNumber) {
        alert("Будь ласка, введіть номер телефону перед купівлею.");
        return;
    }
  
    // Обчисліть загальну ціну, додавши всі ціни разом
    const totalPrice = basePrice + enginePrice + exteriorPrice + wheelsPrice + interiorPrice + interiorColorPrice;
    // Збудова рядка `mailto:` з параметрами
    const emailSubject = encodeURIComponent("Car Purchase");
    const emailBody = encodeURIComponent(`Вибрана модель: ${carModel}\n\nВибрані конфігурації:\n\nДвигун/привод: ${selectedEngine}\nЕкстер'єр: ${selectedExterior}\nДиски: ${selectedWheels}\nІнтер'єр: ${selectedInterior}\nІнтер'єр - Колір: ${selectedInteriorColor}\nЗагальна ціна: ${totalPrice}\n\nНомер телефону: ${phoneNumber}`);
    const mailtoLink = `mailto:in7264@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // Відкриття стандартного клієнта електронної пошти зі збудованим посиланням
    window.location.href = mailtoLink;
}