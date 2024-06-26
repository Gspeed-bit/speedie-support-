import React from 'react';
import { Link } from 'react-router-dom';

const TicketsItems = ({ ticket }) => {
  return (
    <tr>
      <td className='whitespace-nowrap px-4 py-2  text-gray-700 '>
        {new Date(ticket.createdAt).toLocaleString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </td>
      <td className='whitespace-nowrap px-4 py-2 text-gray-700 '>
        {ticket.product}
      </td>
      <td className='whitespace-nowrap capitalize px-4 py-2'>
        <button
          className={`inline-block capitalize rounded px-4 py-2 cursor-default text-xs font-medium text-white ${
            ticket.status === 'New'
              ? 'bg-orange-500'
              : ticket.status === 'Open'
              ? 'bg-green-500 '
              : ticket.status === 'In Progress'
              ? 'bg-purple-500'
              : ticket.status === 'Closed'
              ? 'bg-red-500 '
              : ''
          }`}
        >
          {ticket.status}
        </button>
      </td>

      <td className='whitespace-nowrap px-4 py-2'>
        <Link to={`/tickets/${ticket._id}`}>
          <button className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'>
            View
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default TicketsItems;
