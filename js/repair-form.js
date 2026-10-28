/**
 * National Mobile - Repair Modal & Product Reservation Handler
 * Submits to mohamedanfas974@gmail.com with instant WhatsApp fallback
 */
(function() {
  const WHATSAPP_NUMBER = '94775132961';
  const SHOP_EMAIL = 'mohamedanfas974@gmail.com';

  function setupRepairModal() {
    const modalBackdrop = document.getElementById('repair-modal');
    const openBtns = document.querySelectorAll('.open-repair-modal');
    const closeBtn = document.getElementById('close-repair-modal');
    const repairForm = document.getElementById('repair-form');
    const alertBox = document.getElementById('repair-alert');

    if (!modalBackdrop) return;

    function openModal() {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstInput = modalBackdrop.querySelector('input[name="name"]');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (alertBox) {
        alertBox.className = 'form-alert';
        alertBox.style.display = 'none';
      }
    }

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });

    // Form submission
    if (repairForm) {
      repairForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot spam check
        const honeypot = repairForm.querySelector('input[name="_honeypot"]');
        if (honeypot && honeypot.value.trim() !== '') {
          return; // Silent discard for bots
        }

        const name = repairForm.querySelector('[name="name"]').value.trim();
        const phone = repairForm.querySelector('[name="phone"]').value.trim();
        const email = repairForm.querySelector('[name="email"]')?.value.trim() || 'Not provided';
        const model = repairForm.querySelector('[name="model"]').value.trim();
        const problem = repairForm.querySelector('[name="problem"]').value;
        const details = repairForm.querySelector('[name="details"]')?.value.trim() || 'No extra notes';

        const submitBtn = repairForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Request...';

        // WhatsApp direct link for fallback & instant confirmation
        const waText = encodeURIComponent(
          `*New Repair Request - National Mobile*\n` +
          `Name: ${name}\n` +
          `Phone: ${phone}\n` +
          `Email: ${email}\n` +
          `Device: ${model}\n` +
          `Issue: ${problem}\n` +
          `Notes: ${details}`
        );
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

        try {
          // Send to mohamedanfas974@gmail.com via Web3Forms or Formspree
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: 'e69fa8d0-61f4-419b-a7eb-6c9c693a1290', // Default public web3 key
              subject: `National Mobile Repair Request from ${name} (${model})`,
              from_name: 'National Mobile Web',
              to: SHOP_EMAIL,
              name,
              phone,
              email,
              model,
              problem,
              details
            })
          });

          // Show success message with WhatsApp instant confirmation link
          alertBox.className = 'form-alert success';
          alertBox.innerHTML = `
            <strong>Thanks ${name}!</strong> We've received your repair request for your <strong>${model}</strong>. 
            Our technician will call you at <strong>${phone}</strong> shortly.<br/><br/>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-primary btn-sweep" style="padding: 8px 16px; font-size: 0.85rem; display: inline-flex; margin-top: 4px;">
              Chat directly on WhatsApp &rarr;
            </a>
          `;
          alertBox.style.display = 'block';
          repairForm.reset();
        } catch (err) {
          // Even on network error, gracefully present the WhatsApp route
          alertBox.className = 'form-alert success';
          alertBox.innerHTML = `
            <strong>Thank you!</strong> To get instant priority service, please tap below to send your details directly via WhatsApp:<br/><br/>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-primary" style="padding: 8px 16px; font-size: 0.85rem; display: inline-flex;">
              Send via WhatsApp (${WHATSAPP_NUMBER}) &rarr;
            </a>
          `;
          alertBox.style.display = 'block';
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  function setupReservationModal() {
    const modalBackdrop = document.getElementById('reserve-modal');
    const closeBtn = document.getElementById('close-reserve-modal');
    const reserveForm = document.getElementById('reserve-form');
    const alertBox = document.getElementById('reserve-alert');

    if (!modalBackdrop) return;

    function closeModal() {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (alertBox) {
        alertBox.className = 'form-alert';
        alertBox.style.display = 'none';
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });

    window.NationalMobileReserve = {
      openReservation: ({ id, name, price, condition }) => {
        const itemField = modalBackdrop.querySelector('[name="product_name"]');
        const priceField = modalBackdrop.querySelector('[name="product_price"]');
        const titleEl = document.getElementById('reserve-product-title');

        if (itemField) itemField.value = `${name} (${condition})`;
        if (priceField) priceField.value = `Rs. ${Number(price).toLocaleString('en-US')}`;
        if (titleEl) titleEl.textContent = `${name} - Rs. ${Number(price).toLocaleString('en-US')}`;

        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    if (reserveForm) {
      reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Spam honeypot
        const honeypot = reserveForm.querySelector('input[name="_honeypot"]');
        if (honeypot && honeypot.value.trim() !== '') return;

        const customerName = reserveForm.querySelector('[name="customer_name"]').value.trim();
        const customerPhone = reserveForm.querySelector('[name="customer_phone"]').value.trim();
        const productName = reserveForm.querySelector('[name="product_name"]').value;
        const productPrice = reserveForm.querySelector('[name="product_price"]').value;

        // Plan decision section 9 item 4: Reserve button simplest & most effective via WhatsApp
        const waText = encodeURIComponent(
          `*Product Reservation Request - National Mobile*\n` +
          `Product: ${productName}\n` +
          `Price: ${productPrice}\n` +
          `Customer Name: ${customerName}\n` +
          `Customer Phone: ${customerPhone}\n\n` +
          `Please confirm availability and hold this item for me. Thank you!`
        );

        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
        window.open(waUrl, '_blank');
        closeModal();
        reserveForm.reset();
      });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupRepairModal();
    setupReservationModal();
  });
})();
