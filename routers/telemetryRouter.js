const express = require('express');
const router = express.Router();

// Root redirect to Dashboard
router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// 1. Dashboard.ejs - Live Status & Telemetry
router.get('/dashboard', (req, res) => {
  res.render('pages/Dashboard', {
    pageTitle: 'Telemetry Dashboard',
    pageSubtitle: 'Solar race telemetry link: IWOS-07 sensor station',
    activePage: 'dashboard',
    batteryLevel: 87,
    telemetry: {
      feeds: [
        { label: 'Irradiance', val: 1042, unit: 'W/m²', color: 'val-amber', icon: 'sun' },
        { label: 'Atmos', val: '32.4', unit: '°C / 42%', color: 'val-blue', icon: 'thermometer' },
        { label: 'Wind', val: '18.4', unit: 'km/h', color: 'val-cyan', icon: 'wind' },
        { label: 'Rainfall', val: '0.0', unit: 'mm/h', color: 'val-red', icon: 'droplet' }
      ]
    },
    dynamics: {
      speed: 92,
      logToday: 142.8,
      lat: '34.0522° N',
      lng: '118.2437° W'
    }
  });
});

// 2. Sync&Sessions.ejs - Sync & Logs
router.get('/sync-sessions', (req, res) => {
  res.render('pages/Sync&Sessions', {
    pageTitle: 'Sync & Sessions',
    pageSubtitle: 'Telemetry sync buffer queues and active diagnostic sessions',
    activePage: 'sync',
    batteryLevel: 87,
    metrics: {
      pendingPackets: 124,
      bufferCapacity: '82%',
      avgLatency: '42ms',
      uplinkRate: '1.4 MB/s'
    },
    sessions: [
      {
        sessionId: 'SES-9821',
        driverName: 'K. Ndlovu',
        segment: 'Stage 2 - Sector B',
        duration: '01h 42m',
        packetsSent: 18450,
        status: 'Active',
        statusClass: 'status-active'
      },
      {
        sessionId: 'SES-9820',
        driverName: 'M. Pretorius',
        segment: 'Stage 1 - Sector A',
        duration: '02h 15m',
        packetsSent: 24810,
        status: 'Synced',
        statusClass: 'status-synced'
      },
      {
        sessionId: 'SES-9819',
        driverName: 'Buffer Flush',
        segment: 'Depot Pit Lane',
        duration: '00h 18m',
        packetsSent: 3420,
        status: 'Completed',
        statusClass: 'status-completed'
      }
    ]
  });
});

// 3. route-setUp.ejs - Navigation Map & Route Drawer (Matches exact camelCase)[cite: 9]
router.get('/route-setup', (req, res) => {
  res.render('pages/route-setUp', {
    pageTitle: 'Route Setup',
    pageSubtitle: 'Real-time GPS destination selection',
    activePage: 'route-setup',
    batteryLevel: 87,
    savedPlaces: [
      { name: 'Home Terminal', distance: '4.8 mi', type: 'place' },
      { name: 'Downtown Office', distance: '12.4 mi', type: 'history' }
    ]
  });
});

// 4. register.ejs - Account Registration[cite: 9]
router.get('/register', (req, res) => {
  res.render('pages/register', {
    pageTitle: 'Get Started',
    pageSubtitle: 'Set up your sensor account and vehicle profile',
    activePage: 'register',
    batteryLevel: 87,
    formData: {
      name: '',
      email: 'driver@example.com',
      password: 'Roadster2024!',
      vehicleNickname: ''
    }
  });
});

// Driver Sign In / Sign Up page
router.get('/signup', (req, res) => {
  res.render('pages/signUp', {
    pageTitle: 'Sign In',
    pageSubtitle: 'Driver authentication access portal',
    activePage: 'signup',
    batteryLevel: 87,
    errorMessage: '',
    email: 'driver@iwos.org'
  });
});

module.exports = router;