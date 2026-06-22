import React, { useState } from 'react'

import './MyOrderPage.css'
import Table from '../Common/Table'
import useData from '../../hooks/useData'

const MyOrderPage = () => {
  const {data: orders, error, isLoading} = useData("/order")

  return (
    <section className="aligncenter myorder_page">
      {isLoading&& <p>Please Wait!!</p>}
      {error && <em className='form_error'>{error}</em> }
       {orders && <Table headings={["order", "Products", "Total", "Status"]}>
          <tbody>
            {orders?.map(
              (order, index) => 
                <tr key={order._id} >
                  <td>{index+1}</td>
                  <td>
                  {order?.products?.map((p, productIndex) => (
                    <div key={p?.product?._id || productIndex}>
                      {p?.product?.title} - {p?.quantity}
                    </div>
                  ))}
                </td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                </tr>
            )}
          </tbody>
        </Table>}
    </section>
  )
}

export default MyOrderPage