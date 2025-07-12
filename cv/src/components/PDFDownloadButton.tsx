'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import AmericanCVPDF from './AmericanCVPDF';
import { useEffect, useState } from 'react';

export default function PDFDownloadButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="text-gray-400 flex items-center gap-1.5 text-sm">
        <Download size={16} />
        <span className="hidden sm:inline">Download</span>
      </div>
    );
  }

  return (
    <PDFDownloadLink
      document={<AmericanCVPDF />}
      fileName="Marius_Deleuil_Resume.pdf"
      className="text-gray-400 hover:text-gray-600 transition-colors group flex items-center gap-1.5 text-sm"
      aria-label="Download Resume"
      title="Download Resume"
    >
      {({ loading }) => (
        <>
          <Download size={16} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">
            {loading ? 'Generating...' : 'Download'}
          </span>
        </>
      )}
    </PDFDownloadLink>
  );
} 