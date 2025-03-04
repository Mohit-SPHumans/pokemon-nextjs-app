'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  return (
    <nav className="flex mb-6 text-sm">
      <Link href="/" className="text-blue-600 hover:text-blue-800">
        Home
      </Link>
      
      {pathSegments.map((segment, index) => {
        // Create a path for the current breadcrumb item
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        
        // Format the segment (capitalize first letter)
        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);
        
        return (
          <span key={index} className="flex items-center">
            <span className="mx-2 text-gray-500">&gt;</span>
            <Link 
              href={href} 
              className="text-blue-600 hover:text-blue-800"
            >
              {formattedSegment}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}