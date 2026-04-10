import pool from '../config/db.js';
import { validateAddSchool, validateListSchools } from '../utils/validators.js';
import { calculateDistance } from '../utils/distance.js';

const addSchool = async (req, res) => {
  const errors = validateAddSchool(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const { name, address, latitude, longitude } = req.body;

  const [result] = await pool.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
  );

  return res.status(201).json({
    success: true,
    message: 'School added successfully',
    data: {
      id: result.insertId,
      name: name.trim(),
      address: address.trim(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  });
};

const listSchools = async (req, res) => {
  const errors = validateListSchools(req.query);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  const [schools] = await pool.execute('SELECT * FROM schools');

  const schoolsWithDistance = schools.map((school) => ({
    id: school.id,
    name: school.name,
    address: school.address,
    latitude: school.latitude,
    longitude: school.longitude,
    distance_km: parseFloat(
      calculateDistance(userLat, userLon, school.latitude, school.longitude).toFixed(4)
    ),
  }));

  schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

  return res.status(200).json({
    success: true,
    message: 'Schools retrieved and sorted by proximity',
    count: schoolsWithDistance.length,
    user_location: { latitude: userLat, longitude: userLon },
    data: schoolsWithDistance,
  });
};

export { addSchool, listSchools };
