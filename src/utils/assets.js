export const getAssetUrl = (path) => {
  if (!path) return '/eatmalawi/featured/placeholder.jpg';
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If it's just a filename, assume it's in the featured folder
  if (!cleanPath.includes('/')) {
    return `${import.meta.env.BASE_URL}featured/${cleanPath}`;
  }
  
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
