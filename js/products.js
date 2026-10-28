/**
 * National Mobile - Products Catalog Renderer
 * Reads from data/products.json and builds dynamic product sections
 */
(function() {
  let catalogData = null;
  let accessoriesExpanded = false;

  const ICONS = {
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.36 7.03 9.09 7.09 8.86 7.34C8.63 7.6 7.99 8.2 7.99 9.42C7.99 10.64 8.88 11.82 9.01 11.99C9.13 12.16 10.74 14.65 13.21 15.72C15.27 16.6 15.69 16.43 16.14 16.39C16.59 16.35 17.58 15.8 17.78 15.23C17.98 14.67 17.98 14.18 17.92 14.08C17.86 13.98 17.71 13.92 17.48 13.81C17.25 13.69 16.13 13.14 15.92 13.06C15.71 12.98 15.56 12.94 15.41 13.17C15.26 13.4 14.83 13.92 14.7 14.08C14.57 14.23 14.45 14.25 14.22 14.14C13.99 14.02 13.06 13.72 11.95 12.73C11.09 11.96 10.51 11.01 10.28 10.62C10.05 10.23 10.26 10.02 10.37 9.9C10.47 9.8 10.6 9.64 10.71 9.5C10.83 9.36 10.87 9.26 10.95 9.1C11.03 8.94 10.99 8.8 10.93 8.68C10.87 8.56 10.42 7.45 10.23 7C10.05 6.56 9.87 6.62 9.73 6.61C9.6 6.61 9.45 6.61 9.3 6.61L9.53 7.03Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    tag: '<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>'
  };

  function formatPrice(num, currency = 'Rs.') {
    return `${currency} ${Number(num).toLocaleString('en-US')}`;
  }

  function getStockLabel(stock) {
    switch (stock) {
      case 'in_stock':
        return '<span class="badge-stock stock-in">In Stock</span>';
      case 'low_stock':
        return '<span class="badge-stock stock-low">Low Stock</span>';
      case 'out_of_stock':
      default:
        return '<span class="badge-stock stock-out">Out of Stock</span>';
    }
  }

  function createProductCard(item, category, currency, whatsappNum, callNum) {
    const isOutOfStock = item.stock === 'out_of_stock';
    const conditionBadge = item.condition ? `
      <span class="badge-condition ${item.condition.toLowerCase() === 'new' ? 'badge-new' : 'badge-used'}">
        ${item.condition}
      </span>
    ` : '';

    const specsHtml = item.specs ? `
      <ul class="card-specs">
        ${item.specs.map(spec => `<li>${ICONS.check} <span>${spec}</span></li>`).join('')}
      </ul>
    ` : '';

    // WhatsApp pre-filled message URL
    const conditionText = item.condition ? ` (${item.condition})` : '';
    const message = encodeURIComponent(`Hi National Mobile, I'm interested in: ${item.name}${conditionText} - ${formatPrice(item.price, currency)}`);
    const waUrl = `https://wa.me/${whatsappNum}?text=${message}`;
    const callUrl = `tel:${callNum}`;

    let actionsHtml = '';
    if (isOutOfStock) {
      const notifyMessage = encodeURIComponent(`Hi National Mobile, please notify me when ${item.name} is back in stock.`);
      actionsHtml = `
        <a href="https://wa.me/${whatsappNum}?text=${notifyMessage}" target="_blank" rel="noopener" class="btn-secondary btn-card-reserve btn-notify">
          ${ICONS.whatsapp} Notify me via WhatsApp
        </a>
      `;
    } else {
      actionsHtml = `
        <button type="button" class="btn-primary btn-card-reserve btn-reserve-trigger" data-product-id="${item.id}" data-product-name="${item.name}" data-product-price="${item.price}" data-product-condition="${item.condition || 'New'}">
          Reserve
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener" class="icon-btn btn-card-icon" title="Chat on WhatsApp" aria-label="WhatsApp enquiry for ${item.name}">
          ${ICONS.whatsapp}
        </a>
        <a href="${callUrl}" class="icon-btn btn-card-icon" title="Call Shop" aria-label="Call for ${item.name}">
          ${ICONS.phone}
        </a>
      `;
    }

    return `
      <article class="product-card ${isOutOfStock ? 'out-of-stock' : ''}" id="card-${item.id}">
        <div class="card-badges">
          ${conditionBadge}
          ${getStockLabel(item.stock)}
        </div>
        <div class="card-img-wrapper">
          <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy" />
        </div>
        <div class="card-info">
          <span class="card-brand">${item.brand}</span>
          <h3 class="card-name">${item.name}</h3>
          ${specsHtml}
          <div class="card-price-row">
            <span class="card-price-label">Price</span>
            <span class="card-price">${formatPrice(item.price, currency)}</span>
          </div>
          <div class="card-actions">
            ${actionsHtml}
          </div>
        </div>
      </article>
    `;
  }

  function renderPhones(phones, currency, whatsappNum, callNum) {
    const container = document.getElementById('phones-grid');
    if (!container) return;
    container.innerHTML = phones.map(p => createProductCard(p, 'phones', currency, whatsappNum, callNum)).join('');
  }

  function renderAccessories(accessories, currency, whatsappNum, callNum, showAll = false) {
    const container = document.getElementById('accessories-grid');
    if (!container) return;
    const itemsToRender = showAll ? accessories : accessories.slice(0, 8);
    container.innerHTML = itemsToRender.map(a => createProductCard(a, 'accessories', currency, whatsappNum, callNum)).join('');

    const toggleBtn = document.getElementById('toggle-accessories-btn');
    if (toggleBtn) {
      if (accessories.length <= 8) {
        toggleBtn.style.display = 'none';
      } else {
        toggleBtn.style.display = 'inline-flex';
        toggleBtn.innerHTML = showAll 
          ? `Show Less Accessories &uarr;` 
          : `Show All ${accessories.length} Accessories (${accessories.length - 8} more) &darr;`;
      }
    }
  }

  function renderGadgets(gadgets, currency, whatsappNum, callNum) {
    const container = document.getElementById('gadgets-grid');
    if (!container) return;
    container.innerHTML = gadgets.map(g => createProductCard(g, 'gadgets', currency, whatsappNum, callNum)).join('');
  }

  function bindEvents() {
    // Show More Accessories Toggle
    const toggleBtn = document.getElementById('toggle-accessories-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        accessoriesExpanded = !accessoriesExpanded;
        if (catalogData) {
          renderAccessories(
            catalogData.accessories, 
            catalogData.currency, 
            catalogData.whatsappNumber, 
            catalogData.callNumber, 
            accessoriesExpanded
          );
          if (!accessoriesExpanded) {
            document.getElementById('accessories')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }

    // Reservation trigger
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.btn-reserve-trigger');
      if (trigger) {
        const id = trigger.getAttribute('data-product-id');
        const name = trigger.getAttribute('data-product-name');
        const price = trigger.getAttribute('data-product-price');
        const condition = trigger.getAttribute('data-product-condition');
        window.NationalMobileReserve?.openReservation({ id, name, price, condition });
      }
    });
  }

  async function initProducts() {
    try {
      const res = await fetch('data/products.json');
      if (!res.ok) throw new Error('Failed to load products.json');
      catalogData = await res.json();

      const { currency, whatsappNumber, callNumber, phones, accessories, gadgets } = catalogData;

      renderPhones(phones || [], currency, whatsappNumber, callNumber);
      renderAccessories(accessories || [], currency, whatsappNumber, callNumber, false);
      renderGadgets(gadgets || [], currency, whatsappNumber, callNumber);
      bindEvents();
    } catch (err) {
      console.error('Error loading product catalog:', err);
    }
  }

  window.addEventListener('DOMContentLoaded', initProducts);

  window.NationalMobileCatalog = {
    getData: () => catalogData
  };
})();
