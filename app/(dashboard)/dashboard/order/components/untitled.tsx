//   {/* <table className="table-auto border-spacing-y-6">
//       <thead className="bg-gray-200">
//         <tr className="">
//           <th className="text-left px-4 py-2">ORDER ID</th>
//           <th className="text-left px-4 py-2">CREATED</th>
//           <th className="text-left px-4 py-2">CUSTOMER</th>
//           <th className="text-left px-4 py-2">TOTAL </th>
//           {/* <th className="text-left px-4">PROFIT</th> */}
//           {/* <th className="text-left px-4">STATUS</th> */}
//           <th className="text-left px-4"></th>
//         </tr>
//       </thead>
//       <tbody className="">
//         {filteredData.length < 1 ? (
//           <tr>
//             <td
//               colSpan={5}
//               className="text-center p-4 font-semibold w-full"
//             >
//               No result
//             </td>
//           </tr>
//         ) : (
//           filteredData.map((item, i) => (
//             <tr key={i} className="border-b-2">
//               <td className="p-2 text-nowrap">{item._id}</td>
//               <td className="p-2 text-nowrap">
//                 {moment(item.createdAt).fromNow()}
//               </td>
//               <td className="p-2 text-nowrap">{item.customer.name}</td>
//               <td className="p-2 text-nowrap">
//                 {item.payment.currency ?? ""} {item.payment.amount}
//               </td>
//               <td>
//                 <MdOutlineArrowDropDownCircle
//                   className={`text-xl cursor-pointer ${
//                     tableRowIndex === i && "rotate-180"
//                   }`}
//                   onClick={() => {
//                     setSelectedOrder(item);
//                     setTableRowIndex(i);
//                     setMoreDetailModal(true);
//                   }}
//                 />
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table> */}
