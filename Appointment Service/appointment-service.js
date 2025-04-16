const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

let appointments = [
  { id: '1', patientId: '1', date: '2023-06-15', time: '10:00', doctor: 'Dr. Smith' },
  { id: '2', patientId: '2', date: '2023-06-16', time: '14:30', doctor: 'Dr. Johnson' }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Appointment Service' });
});

app.get('/appointments', (req, res) => {
  res.json({ message: 'Appointments retrieved successfully', count: appointments.length, appointments });
});

app.get('/appointments/:id', (req, res) => {
  const appointment = appointments.find(a => a.id === req.params.id);
  if (appointment) {
    res.json({ message: 'Appointment found', appointment });
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});

app.post('/appointments', (req, res) => {
  const { patientId, date, time, doctor } = req.body;
  if (!patientId || !date || !time || !doctor) {
    return res.status(400).json({ error: 'Patient ID, date, time, and doctor are required' });
  }
  const newAppointment = { id: (appointments.length + 1).toString(), patientId, date, time, doctor };
  appointments.push(newAppointment);
  res.status(201).json({ message: 'Appointment scheduled successfully', appointment: newAppointment });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Appointment service listening at http://0.0.0.0:${port}`);
});
