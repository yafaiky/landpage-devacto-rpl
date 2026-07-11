// Helper function to extract text excerpt from markdown
const getExcerpt = (content) => {
  if (!content) return '';
  const lines = content.split('\n');
  const paragraph = lines.find(line => line.trim().length > 0 && !line.startsWith('#'));
  if (!paragraph) return '';
  const clean = paragraph.replace(/[*_>]/g, '').trim();
  return clean.length > 150 ? clean.substring(0, 150) + '...' : clean;
};

export default getExcerpt;