/**
 * NYX VOSS — Main Interactive App Script
 */

(function () {
  'use strict';

  // Navigation scroll styling
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        nav.classList.remove('mobile-open');
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Copy booking email
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'contact@nyxvoss.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied to clipboard
        `;
        copyBtn.style.color = 'var(--crimson-bright)';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.color = '';
        }, 2500);
      });
    });
  }

  // Hero Quick Actions
  const heroListenBtn = document.getElementById('heroListenBtn');
  if (heroListenBtn) {
    heroListenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tracksSection = document.getElementById('music');
      if (tracksSection) {
        tracksSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (window.NyxAudio) {
            window.NyxAudio.playCurrent();
          }
        }, 600);
      }
    });
  }

  const heroWatchBtn = document.getElementById('heroWatchBtn');
  if (heroWatchBtn) {
    heroWatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.NyxVideoModal) {
        window.NyxVideoModal.open(
          'videos/nyx_voss_dont_look_soft_teaser_15s.mp4',
          "Don't Look Soft — Official Teaser Trailer",
          "NYX VOSS • Debut Gothic Single Visualizer",
          false
        );
      }
    });
  }

  // Nyx Voss Merch Data & Modal
  const NYX_MERCH = {
    tee: {
      title: "Nothing Soft Survives Heavyweight Band Tee",
      price: 34,
      sizes: ["S", "M", "L", "XL", "2XL"],
      spec: "100% Combed Ringspun Cotton • Pitch Black",
      img: "https://images-api.printify.com/mockup/6aa5bd2cfeeb21d8740fad16/18102/102044/nyx-voss-nothing-soft-survives-heavyweight-band-tee.jpg?camera_label=front-2",
      desc: "Official heavyweight vintage black band tee featuring the Nothing Soft Survives album cover art and industrial gothic typography."
    },
    hoodie: {
      title: "Nothing Soft Survives Heavyweight Fleece Hoodie",
      price: 58,
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
      spec: "10oz Heavyweight Fleece • Deep Black",
      img: "https://images-api.printify.com/mockup/6aa5bd30b6bdffef520bd68a/32920/98424/nyx-voss-nothing-soft-survives-heavyweight-fleece-hoodie.jpg?camera_label=front",
      desc: "Premium heavyweight pullover hoodie with double-layer hood, front pouch pocket, and high definition Nothing Soft Survives front print."
    },
    poster: {
      title: "Cathedral Seraph Archival Gothic Poster (18\" x 24\")",
      price: 24,
      sizes: null,
      spec: "175gsm Fine Art Matte • Museum Grade",
      img: "https://images-api.printify.com/mockup/6aa5bd3381bf80bae9088fbe/43172/94818/nyx-voss-cathedral-seraph-archival-gothic-poster.jpg?camera_label=front",
      desc: "Limited museum-grade fine art giclée print of Nyx Voss standing before the cathedral altar. Vibrant archival inks on matte paper."
    },
    mug: {
      title: "Gothic Monogram Ceramic Mug (11oz)",
      price: 18,
      sizes: null,
      spec: "11oz High-Gloss Black Accent Ceramic",
      img: "https://images-api.printify.com/mockup/6aa5bd35c2763c2ff201c2f3/33719/6400/nyx-voss-nothing-soft-survives-ceramic-mug-11oz.jpg?camera_label=front",
      desc: "High gloss black accent ceramic mug with razor-sharp album artwork and NV emblem. Microwave & dishwasher safe."
    }
  };

  let nyxSelectedSize = "L";
  let nyxSelectedQty = 1;

  window.openNyxMerch = function (key) {
    const item = NYX_MERCH[key] || NYX_MERCH.tee;
    nyxSelectedSize = item.sizes ? item.sizes[1] || "M" : null;
    nyxSelectedQty = 1;

    const modal = document.getElementById('merchModal');
    const container = document.getElementById('merchModalContent');
    if (!modal || !container) return;

    function render() {
      const subtotal = (item.price * nyxSelectedQty).toFixed(2);
      let sizeHtml = "";
      if (item.sizes) {
        sizeHtml = `
          <div style="margin: 1.2rem 0;">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:0.6rem;">Select Size</div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              ${item.sizes.map(s => `
                <button type="button" class="nyx-size-btn" style="padding:0.4rem 0.9rem; border-radius:4px; font-family:var(--font-mono); font-size:0.85rem; cursor:pointer; background:${s === nyxSelectedSize ? 'var(--crimson-core)' : 'rgba(255,255,255,0.06)'}; color:#fff; border:1px solid ${s === nyxSelectedSize ? 'var(--crimson-bright)' : 'rgba(255,255,255,0.15)'};" onclick="window.setNyxSize('${s}', '${key}')">${s}</button>
              `).join('')}
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div style="text-align:left;">
          <div style="font-size:0.72rem; color:var(--crimson-bright); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.4rem;">${item.spec}</div>
          <h3 style="font-family:var(--font-display); font-size:1.35rem; color:#fff; margin-bottom:0.5rem; line-height:1.25;">${item.title}</h3>
          <p style="color:var(--text-muted); font-size:0.85rem; line-height:1.5; margin-bottom:1.2rem;">${item.desc}</p>
          
          <div style="width:100%; aspect-ratio:1/1; max-height:220px; border-radius:8px; overflow:hidden; margin-bottom:1.2rem; background:#06060a; border:1px solid rgba(255,255,255,0.1);">
            <img src="${item.img}" alt="${item.title}" style="width:100%; height:100%; object-fit:contain;">
          </div>

          ${sizeHtml}

          <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.75rem 1.2rem; margin:1rem 0;">
            <div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-dim);">Quantity</div>
              <div style="font-size:1.25rem; font-weight:700; color:#fff; font-family:var(--font-subhead);">$${subtotal} <span style="font-size:0.75rem; font-weight:400; color:var(--text-muted);">USD</span></div>
            </div>
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <button type="button" style="width:32px; height:32px; border-radius:4px; border:1px solid rgba(255,255,255,0.2); background:#111; color:#fff; font-size:1.1rem; cursor:pointer;" onclick="window.changeNyxQty(-1, '${key}')">-</button>
              <span style="font-size:1.1rem; font-weight:700; min-width:20px; text-align:center; color:#fff;">${nyxSelectedQty}</span>
              <button type="button" style="width:32px; height:32px; border-radius:4px; border:1px solid rgba(255,255,255,0.2); background:#111; color:#fff; font-size:1.1rem; cursor:pointer;" onclick="window.changeNyxQty(1, '${key}')">+</button>
            </div>
          </div>

          <form onsubmit="window.submitNyxOrder(event, '${key}')" style="margin-top:1.2rem;">
            <div style="margin-bottom:0.8rem;">
              <input type="email" id="nyxBuyerEmail" required placeholder="Enter email address for dispatch receipt..." style="width:100%; padding:0.85rem 1.2rem; border-radius:6px; border:1px solid var(--crimson-border); background:rgba(0,0,0,0.8); color:#fff; font-size:0.9rem; box-sizing:border-box; outline:none; font-family:inherit;">
            </div>
            <button type="submit" class="merch-buy-btn" style="width:100%; padding:0.95rem; font-size:0.95rem;">
              Secure Order Dispatch ($${subtotal})
            </button>
          </form>

          <div style="margin-top:0.8rem; text-align:center; font-size:0.72rem; color:var(--text-dim);">
            ✓ Official Printify Production • Worldwide Tracking • Dispatch in 2-4 Days
          </div>
        </div>
      `;
    }

    window.setNyxSize = function(s, k) {
      nyxSelectedSize = s;
      render();
    };

    window.changeNyxQty = function(delta, k) {
      nyxSelectedQty = Math.max(1, Math.min(10, nyxSelectedQty + delta));
      render();
    };

    window.submitNyxOrder = function(e, k) {
      e.preventDefault();
      const email = document.getElementById('nyxBuyerEmail').value;
      const sizeStr = nyxSelectedSize ? `Size: ${nyxSelectedSize} • ` : '';
      container.innerHTML = `
        <div style="text-align:center; padding:1.5rem 0.5rem;">
          <div style="width:50px; height:50px; border-radius:50%; background:rgba(225,29,72,0.15); border:1px solid var(--crimson-bright); display:flex; align-items:center; justify-content:center; margin:0 auto 1.2rem; color:var(--crimson-bright);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 style="font-family:var(--font-display); font-size:1.4rem; color:#fff; margin-bottom:0.5rem;">Transmission Logged</h3>
          <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.6; margin-bottom:1.5rem;">
            Order hold confirmed for <strong>${item.title}</strong> (${sizeStr}Qty: ${nyxSelectedQty}).<br>
            A secure Printify checkout link has been dispatched to <strong>${email}</strong>.
          </p>
          <button type="button" class="merch-buy-btn" onclick="document.getElementById('merchModal').close()">Return to Nyx Voss</button>
        </div>
      `;
    };

    render();
    modal.showModal();
  };
})();

