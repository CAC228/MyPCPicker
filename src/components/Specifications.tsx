import React from 'react';

interface SpecificationsProps {
  specifications: { [key: string]: string | number };
}

const Specifications: React.FC<SpecificationsProps> = ({ specifications }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4">Спецификации</h2>
    <table className="min-w-full bg-white border">
      <tbody>
        {Object.entries(specifications).map(([key, value], index) => (
          <tr key={index} className="text-left border-t">
            <td className="py-2 font-medium">{key}</td>
            <td className="py-2">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Specifications;
