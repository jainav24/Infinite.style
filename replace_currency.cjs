const fs = require('fs');
const glob = require('glob');

const files = [
  'src/pages/Wishlist.tsx',
  'src/pages/ProductDetail.tsx',
  'src/pages/Checkout.tsx',
  'src/pages/Cart.tsx',
  'src/pages/Account.tsx',
  'src/components/InfinityRail.tsx',
  'src/components/HeroCarousel.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace $ followed by { with ₹{
    content = content.replace(/\$\{([a-zA-Z0-9_.]+\.price|\(item\.price|cartTotal|tax|finalTotal)[^}]*\}/g, (match) => {
      return '₹' + match.slice(1);
    });
    // Replace hardcoded $124.98 and $38.99 in Account.tsx
    content = content.replace(/\$124\.98/g, '₹124.98');
    content = content.replace(/\$38\.99/g, '₹38.99');
    
    // Replace template strings like \`\$...
    content = content.replace(/\`\$\$\{/g, '\`₹${');
    content = content.replace(/PAY \$\$\{/g, 'PAY ₹${');
    content = content.replace(/Add \$\$\{/g, 'Add ₹${');
    
    // Replace anywhere we literally typed \$ followed by {
    content = content.replace(/>\$\{/g, '>₹{');
    content = content.replace(/\$100/g, '₹100');
    
    fs.writeFileSync(file, content, 'utf8');
  }
});
