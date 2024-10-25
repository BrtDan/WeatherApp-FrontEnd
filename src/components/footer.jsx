export default function Footer() {
    return (
      <footer className="text-white py-4">
        <div className="text-center text-white">
              <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
              <p className='mt-2'>
                Powered By{' '}
                <a
                  href="https://www.brtdan.it/"
                  className="text-blue-300 underline hover:text-blue-200 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Daniel Bertucci
                </a>
              </p>
            </div>
      </footer>
    );
  }