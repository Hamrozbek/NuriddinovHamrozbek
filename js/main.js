const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

// humburger
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Ixtiyoriy: Link bosilganda menyuni yopish
const links = mobileMenu.querySelectorAll("a");
links.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

// hamburger

// bot 
const BOT_TOKEN = "7947919214:AAGjEfpYDk2-PI190X3cDilyymsDICkz3dY";
const CHAT_ID = "8167187188";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

function showToast(message, color = "bg-green-500") {
    toast.textContent = message;
    toast.className = `fixed top-4 right-4 text-white px-4 py-2 rounded shadow-md z-50 transition ${color}`;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
        showToast("Iltimos, barcha maydonlarni to‘ldiring!", "bg-yellow-500");
        return;
    }

    const message = `
📝 <b>Yangi Forma Yuborildi!</b>
👤 <b>Ismi:</b> ${name}
📞 <b>Telefon:</b> ${phone}
`;

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML"
        })
    })
        .then(response => {
            if (response.ok) {
                showToast("✅ Xabar yuborildi!");
                form.reset();
            } else {
                showToast("❌ Xatolik yuz berdi!", "bg-red-500");
            }
        })
        .catch(error => {
            console.error("Xatolik:", error);
            showToast("❗ Internet yoki bot bilan muammo bor!", "bg-yellow-600");
        });
});

