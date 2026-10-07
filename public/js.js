document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('closeDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('sidebarDrawer');

  function openSidebar() {
    if (!drawer || !overlay) return;
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeSidebar();
    }
  });
});

/**
 * Real-Time Password Strength Evaluator & Visibility Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('registerPassword');
  const toggleBtn = document.getElementById('toggleRegPasswordBtn');
  const strengthLabel = document.getElementById('passwordStrengthLabel');
  const bars = document.querySelectorAll('#passwordMeter .meter-bar');

  // 1. Password Visibility Toggle
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  // 2. Real-Time Password Strength Evaluation
  if (passwordInput && strengthLabel && bars.length > 0) {
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      const score = calculatePasswordStrength(val);
      renderStrength(score, val.length);
    });

    // Run once on load in case formData pre-fills password
    if (passwordInput.value) {
      renderStrength(calculatePasswordStrength(passwordInput.value), passwordInput.value.length);
    }
  }

  function calculatePasswordStrength(pass) {
    if (!pass || pass.length === 0) return 0;

    let score = 0;

    // Rule 1: Length check (>= 8 chars gives base, >= 12 adds bonus)
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;

    // Rule 2: Contains lowercase and uppercase letters
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;

    // Rule 3: Contains numbers
    if (/\d/.test(pass)) score++;

    // Rule 4: Contains special symbols
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    // Clamp score between 1 and 4
    return Math.min(Math.max(score > 1 ? score - 1 : score, 1), 4);
  }

  function renderStrength(level, length) {
    // Reset classes
    bars.forEach((bar) => {
      bar.className = 'meter-bar';
    });
    strengthLabel.className = 'password-strength-label';

    if (length === 0) {
      strengthLabel.textContent = 'Enter password';
      return;
    }

    const configs = [
      { text: 'Weak password', class: 'level-weak' },
      { text: 'Fair password', class: 'level-fair' },
      { text: 'Good password', class: 'level-good' },
      { text: 'Strong password', class: 'level-strong' }
    ];

    const currentConfig = configs[level - 1] || configs[0];

    // Light up bars up to current level
    bars.forEach((bar, index) => {
      if (index < level) {
        bar.classList.add('active', currentConfig.class);
      }
    });

    strengthLabel.textContent = currentConfig.text;
    strengthLabel.classList.add(currentConfig.class);
  }
});

/**
 * Route Setup Interactivity
 */
// Google Maps Dark Theme JSON configuration
const darkMapTheme = [
  { elementType: "geometry", stylers: [{ color: "#0e1218" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0e1218" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#74849a" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9aa9be" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5a687d" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1a222e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#131a24" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a99ad" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#253142" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1c2533" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1b232f" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#080b0f" }]
  }
];

let gMap, directionsService, directionsRenderer, carMarker;
const defaultVehicleLocation = { lat: -26.1500, lng: 28.6800 }; // Current sensor station position

window.initGoogleMap = function () {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  // Initialize Map
  gMap = new google.maps.Map(mapElement, {
    center: defaultVehicleLocation,
    zoom: 13,
    styles: darkMapTheme,
    disableDefaultUI: true, // Clean telemetry look
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false
  });

  // Directions services for accurate turn-by-turn routing
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: gMap,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: "#7075f8",
      strokeOpacity: 0.9,
      strokeWeight: 5
    }
  });

  // Current Vehicle Location Marker
  carMarker = new google.maps.Marker({
    position: defaultVehicleLocation,
    map: gMap,
    title: "IWOS-07 Telemetry Hub",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillColor: "#00e599",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2
    }
  });

  setupRouteInteractions();
};

function setupRouteInteractions() {
  const input = document.getElementById("destinationInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const startBtn = document.getElementById("startTripBtn");
  const placeRows = document.querySelectorAll(".place-row");

  function plotRouteTo(destination) {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route(
      {
        origin: defaultVehicleLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = `Start Route to ${destination}`;
          }
        } else {
          console.error("Routing error:", status);
        }
      }
    );
  }

  // Click on saved waypoints
  placeRows.forEach((row) => {
    row.addEventListener("click", () => {
      const placeName = row.dataset.name;
      const coords = row.dataset.coords;
      if (input) input.value = placeName;
      if (clearBtn) clearBtn.style.display = "block";

      placeRows.forEach((r) => r.classList.remove("selected"));
      row.classList.add("selected");

      plotRouteTo(coords || placeName);
    });
  });

  // Input typing search
  if (input) {
    input.addEventListener("change", () => {
      if (input.value.trim().length > 0) {
        plotRouteTo(input.value.trim());
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (input) input.value = "";
      clearBtn.style.display = "none";
      if (directionsRenderer) directionsRenderer.set('directions', null);
      if (startBtn) {
        startBtn.disabled = true;
        startBtn.textContent = "Select Destination to Calculate Route";
      }
      gMap.panTo(defaultVehicleLocation);
      gMap.setZoom(13);
    });
  }
}