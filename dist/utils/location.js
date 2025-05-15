// utils/location.js

function parseLocation(raw) {
   const [a, b] = raw.split(',').map(Number);

   // 緯度（20〜46） 経度（122〜154）
   const isLatLng = (a >= 20 && a <= 46) && (b >= 122 && b <= 154);
   const isLngLat = (b >= 20 && b <= 46) && (a >= 122 && a <= 154);

   if (isLatLng) {
      return { lat: a, lng: b };
   } else if (isLngLat) {
      return { lat: b, lng: a }; // 順番逆だった
   } else {
      throw new Error(`locationの値が日本の緯度経度の範囲外です: ${raw}`);
   }
}

function normalizeLocation(input) {
   const rawList = Array.isArray(input) ? input : [input];
   return rawList.map(parseLocation);
}

module.exports = {
   normalizeLocation
};
