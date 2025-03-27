document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const catalogSection = document.querySelector('.catalog');

    const adminCredentials = {
        email: 'admin@example.com',
        password: 'admin123'
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Скрываем все элементы, кроме catalog
            document.body.childNodes.forEach(node => {
                if (node.nodeType === 1 && node !== catalogSection) {
                    node.style.display = 'none';
                }
            });
            // Добавляем кнопку "Админ-панель" в catalog
            const adminButton = document.createElement('button');
            adminButton.textContent = 'Админ-панель';
            adminButton.className = 'btn admin-btn';
            adminButton.addEventListener('click', showAdminPanel);
            catalogSection.appendChild(adminButton);

            // Добавляем обработчики для существующих товаров
            document.querySelectorAll('.catalog-item').forEach(item => {
                const link = item.querySelector('.catalog-item__link');
                const back = item.querySelector('.catalog-item__back');
                const content = item.querySelector('.catalog-item__content');
                const list = item.querySelector('.catalog-item__list');

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    content.style.display = 'none';
                    list.style.display = 'block';
                });

                back.addEventListener('click', (e) => {
                    e.preventDefault();
                    list.style.display = 'none';
                    content.style.display = 'block';
                });
            });
        } else {
            alert('Неверный email или пароль!');
        }
    });

    function showAdminPanel() {
        // Удаляем кнопку "Админ-панель" перед показом панели
        const adminButton = document.querySelector('.admin-btn');
        if (adminButton) {
            adminButton.remove();
        }

        const adminPanel = document.createElement('div');
        adminPanel.className = 'admin-panel';
        adminPanel.innerHTML = `
            <div class="admin-container">
                <h1>Панель администратора</h1>
                <div class="admin-controls">
                    <button onclick="logout()">Выйти</button>
                    <div class="admin-content">
                        <h2>Добавить новый товар</h2>
                        <form id="productForm" class="product-form">
                            <select id="catalogSelect" required>
                                <option value="">Выберите секцию каталога</option>
                                <option value="first">Для фитнеса (id="first")</option>
                                <option value="second">Для бега (id="second")</option>
                                <option value="thisd">Для триатлона (id="thisd")</option>
                            </select>
                            <input type="file" id="productImage" accept="image/*" required>
                            <input type="text" id="productTitle" placeholder="Название товара" required>
                            <textarea id="productDescr" placeholder="Описание товара" required></textarea>
                            <input type="number" id="oldPrice" placeholder="Старая цена (грн.)" required>
                            <input type="number" id="newPrice" placeholder="Новая цена (грн.)" required>
                            <input type="number" id="featuresCount" placeholder="Количество характеристик" min="1" max="10" required>
                            <div id="featuresList"></div>
                            <button type="submit" class="btn">Добавить товар</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const styles = `
            <style>
                .admin-panel {
                    min-height: 100vh;
                    background: #f0f2f5;
                    padding: 20px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    display: block;
                }
                .admin-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .admin-controls {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .product-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    max-width: 500px;
                }
                input, textarea, select {
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                textarea {
                    min-height: 100px;
                }
                .btn {
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .btn:hover {
                    background: #0056b3;
                }
                .admin-btn {
                    margin: 20px;
                    display: block;
                }
                .catalog-item {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin: 10px;
                }
                .catalog-item__img {
                    max-width: 100%;
                }
                .catalog-item__subtitle {
                    font-weight: bold;
                }
                .catalog-item__list {
                    list-style-type: none;
                    padding: 0;
                    margin: 10px 0;
                    display: none;
                }
                .catalog-item__content_active {
                    display: block;
                }
                .catalog-item__list li {
                    margin: 5px 0;
                }
                .catalog-item__link, .catalog-item__back {
                    color: #007bff;
                    text-decoration: none;
                    cursor: pointer;
                }
                .catalog-item__link:hover, .catalog-item__back:hover {
                    text-decoration: underline;
                }
                .catalog-item__footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                }
                .catalog-item__prices {
                    display: flex;
                    gap: 10px;
                }
                .catalog-item__old-price {
                    text-decoration: line-through;
                    color: #888;
                }
                .catalog-item__price {
                    font-weight: bold;
                    color: #000;
                }
                .btn_mini {
                    padding: 5px 10px;
                    font-size: 14px;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(adminPanel);

        // Динамическое создание полей для характеристик
        const featuresCountInput = document.getElementById('featuresCount');
        const featuresList = document.getElementById('featuresList');

        featuresCountInput.addEventListener('change', (e) => {
            const count = parseInt(e.target.value);
            featuresList.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Характеристика ${i + 1}`;
                input.className = 'feature-input';
                input.required = true;
                featuresList.appendChild(input);
            }
        });

        // Обработка формы добавления товара
        const productForm = document.getElementById('productForm');
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addProduct();
        });
    }

    function addProduct() {
        const catalogId = document.getElementById('catalogSelect').value;
        const imageFile = document.getElementById('productImage').files[0];
        const title = document.getElementById('productTitle').value;
        const descr = document.getElementById('productDescr').value;
        const oldPrice = document.getElementById('oldPrice').value;
        const newPrice = document.getElementById('newPrice').value;
        const features = Array.from(document.getElementsByClassName('feature-input'))
            .map(input => input.value);

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;

            const productHTML = `
                <div class="catalog-item">
                    <div class="catalog-item__wrapper">
                        <div class="catalog-item__content catalog-item__content_active">
                            <img src="${imageSrc}" alt="" class="catalog-item__img">
                            <div class="catalog-item__subtitle">${title}</div>
                            <div class="catalog-item__descr">${descr}</div>
                            <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a>
                        </div>
                        <ul class="catalog-item__list">
                            ${features.map(feature => `<li>${feature}</li>`).join('')}
                            <li><a href="#" class="catalog-item__back">НАЗАД</a></li>
                        </ul>
                    </div>
                    <hr>
                    <div class="catalog-item__footer">
                        <div class="catalog-item__prices">
                            <div class="catalog-item__old-price">${oldPrice} грн.</div>
                            <div class="catalog-item__price">${newPrice} грн.</div>
                        </div>
                        <button class="btn btn_mini">КУПИТЬ</button>
                    </div>
                </div>
            `;

            const catalogSection = document.getElementById(catalogId);
            if (catalogSection) {
                catalogSection.insertAdjacentHTML('beforeend', productHTML);

                // Добавляем обработчики событий для нового товара
                const items = catalogSection.querySelectorAll('.catalog-item');
                items.forEach(item => {
                    const link = item.querySelector('.catalog-item__link');
                    const back = item.querySelector('.catalog-item__back');
                    const content = item.querySelector('.catalog-item__content');
                    const list = item.querySelector('.catalog-item__list');

                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        content.style.display = 'none';
                        list.style.display = 'block';
                    });

                    back.addEventListener('click', (e) => {
                        e.preventDefault();
                        list.style.display = 'none';
                        content.style.display = 'block';
                    });
                });
            } else {
                alert('Выбранная секция не найдена!');
            }

            document.getElementById('productForm').reset();
            document.getElementById('featuresList').innerHTML = '';
            alert('Товар успешно добавлен!');
        };
        reader.readAsDataURL(imageFile);
    }

    function logout() {
        const adminPanel = document.querySelector('.admin-panel');
        if (adminPanel) {
            adminPanel.remove();
        }
        // Убеждаемся, что catalog виден, и добавляем кнопку "Админ-панель"
        catalogSection.style.display = 'block'; // Гарантируем, что catalog виден
        const existingAdminButton = document.querySelector('.admin-btn');
        if (!existingAdminButton) {
            const adminButton = document.createElement('button');
            adminButton.textContent = 'Админ-панель';
            adminButton.className = 'btn admin-btn';
            adminButton.addEventListener('click', showAdminPanel);
            catalogSection.appendChild(adminButton);
        }

        // Добавляем обработчики для всех товаров после выхода
        document.querySelectorAll('.catalog-item').forEach(item => {
            const link = item.querySelector('.catalog-item__link');
            const back = item.querySelector('.catalog-item__back');
            const content = item.querySelector('.catalog-item__content');
            const list = item.querySelector('.catalog-item__list');

            link.addEventListener('click', (e) => {
                e.preventDefault();
                content.style.display = 'none';
                list.style.display = 'block';
            });

            back.addEventListener('click', (e) => {
                e.preventDefault();
                list.style.display = 'none';
                content.style.display = 'block';
            });
        });
    }
});