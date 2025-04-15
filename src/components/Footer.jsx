import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#121317] text-center text-sm text-gray-400 py-4">
        <div className="space-x-4 mb-1 flex flex-wrap justify-center items-center gap-2 px-4 text-center">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold">Bravera Bank</span> • (877) 483-6811 •
          </p>
          <a href="https://www.bravera.bank/assets/files/iLGn6ymK/CMP-001-0821%20Privacy%20Notice%208.5x11.pdf" className="text-[#F2AA2E] hover:underline">Privacy Policy</a>
          <span className="">•</span>
          <p href="#" className="">Member FDIC</p>
          <span className="">•</span>
          <p href="#" className="">Equal Housing Lender</p>
        </div>
      </footer>
  )
}

export default Footer