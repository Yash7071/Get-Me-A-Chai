import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
   <footer className='bg-slate-900 text-white flex justify-around p-3'>
    <p>Copyright &copy; {currentYear} Get Me A Chai - All rights reserved</p>
   </footer>
  );
};

export default Footer