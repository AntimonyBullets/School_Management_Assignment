const validateAddSchool = (body) => {
  const errors = [];
  const { name, address, latitude, longitude } = body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required and must be a non-empty string');
  }

  if (!address || typeof address !== 'string' || address.trim() === '') {
    errors.push('address is required and must be a non-empty string');
  }

  if (latitude === undefined || latitude === null || latitude === '') {
    errors.push('latitude is required');
  } else {
    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push('latitude must be a valid number between -90 and 90');
    }
  }

  if (longitude === undefined || longitude === null || longitude === '') {
    errors.push('longitude is required');
  } else {
    const lon = parseFloat(longitude);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.push('longitude must be a valid number between -180 and 180');
    }
  }

  return errors;
};

const validateListSchools = (query) => {
  const errors = [];
  const { latitude, longitude } = query;

  if (latitude === undefined || latitude === null || latitude === '') {
    errors.push('latitude query parameter is required');
  } else {
    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push('latitude must be a valid number between -90 and 90');
    }
  }

  if (longitude === undefined || longitude === null || longitude === '') {
    errors.push('longitude query parameter is required');
  } else {
    const lon = parseFloat(longitude);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.push('longitude must be a valid number between -180 and 180');
    }
  }

  return errors;
};

export { validateAddSchool, validateListSchools };
