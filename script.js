const container = document.querySelector('.container');

const unitOptions = [
  { unit: '1 Unit', discount: '10% Off', price: 20, originalPrice: 24 },
  { unit: '2 Unit', discount: '20% Off', price: 18, originalPrice: 24, popular: true },
  { unit: '3 Unit', discount: '30% Off', price: 24, originalPrice: 24 },
];

const sizes = ['Size', 'S', 'M', 'L', 'XL'];
const colors = ['Colour', 'Black', 'Red', 'Blue', 'Green'];

let price = null;

const cardContainer = document.createElement('div');
cardContainer.className = 'card-container';
container.insertBefore(cardContainer, document.querySelector('.summary'));

unitOptions.forEach((option, index) => {
  const card = document.createElement('div');
  card.className = 'card';

  const label = document.createElement('label');
  label.className = 'box';

  if (option.popular) {
    const popularTag = document.createElement('div');
    popularTag.className = 'most-popular';
    popularTag.textContent = 'MOST POPULAR';
    label.appendChild(popularTag);
  }

  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'unit';
  input.className = 'radio-btn';
  input.value = option.unit;
  label.appendChild(input);

  const header = document.createElement('div');
  header.className = 'header';
  header.innerHTML = `
    <div>
      <strong>${option.unit}</strong>
      <span class="badge">${option.discount}</span>
    </div>
    <div class="price">$${option.price.toFixed(2)} USD <small>$${option.originalPrice}</small></div>
  `;
  label.appendChild(header);

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options';
  optionsDiv.style.display = 'none';
  label.appendChild(optionsDiv);

  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th style="text-align: left;"></th>
      <th style="text-align: left;">Size</th>
      <th style="text-align: left;">Colour</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let i = 1; i <= 2; i++) {
    const tr = document.createElement('tr');

    const tdNumber = document.createElement('td');
    tdNumber.textContent = `#${i}`;

    const tdSize = document.createElement('td');
    const sizeSelect = document.createElement('select');
    sizes.forEach(size => {
      const opt = document.createElement('option');
      opt.value = size;
      opt.textContent = size;
      sizeSelect.appendChild(opt);
    });
    tdSize.appendChild(sizeSelect);

    const tdColor = document.createElement('td');
    const colorSelect = document.createElement('select');
    colors.forEach(color => {
      const opt = document.createElement('option');
      opt.value = color;
      opt.textContent = color;
      colorSelect.appendChild(opt);
    });
    tdColor.appendChild(colorSelect);

    tr.appendChild(tdNumber);
    tr.appendChild(tdSize);
    tr.appendChild(tdColor);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  optionsDiv.appendChild(table);

  card.appendChild(label);
  cardContainer.appendChild(card);
});

const radioButtons = document.querySelectorAll('.radio-btn');
const boxes = document.querySelectorAll('.box');
const totalEl = document.querySelector('.total');

function getDiscountedPrice(box) {
  const priceEl = box.querySelector('.price');
  const priceText = priceEl.textContent.trim();
  const match = priceText.match(/\$(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function updateTotal(selectedIndex) {
  const priceValue = getDiscountedPrice(boxes[selectedIndex]);
  totalEl.textContent = `Total: $${priceValue.toFixed(2)} USD`;
  price = priceValue;
}

radioButtons.forEach((radio, index) => {
  radio.addEventListener('change', () => {
    boxes.forEach((box, i) => {
      box.classList.remove('selected');
      const optionsDiv = box.querySelector('.options');
      if (optionsDiv) {
        optionsDiv.style.display = i === index ? 'block' : 'none';
      }
    });

    const selectedBox = boxes[index];
    selectedBox.classList.add('selected');

    updateTotal(index);
  });
});

window.onload = () => {
  if (radioButtons.length > 0) {
    radioButtons[0].checked = true;
    boxes[0].classList.add('selected');
    const optionsDiv = boxes[0].querySelector('.options');
    if (optionsDiv) optionsDiv.style.display = 'block';
    updateTotal(0);
  }
};
