const toRad = (v: number) => {
  return (v * Math.PI) / 180;
};

// https://gist.github.com/SimonJThompson/c9d01f0feeb95b18c7b0
const haversineCalculator = (l1: any, l2: any) => {
  const R = 6371; // km
  const x1 = l2.Latitude - l1.Latitude;
  const dLat = toRad(x1);
  const x2 = l2.Longitude - l1.Longitude;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(l1.Latitude)) *
      Math.cos(toRad(l2.Latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

export default haversineCalculator;
