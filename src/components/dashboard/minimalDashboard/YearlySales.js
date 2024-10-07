import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DashCard from '../dashboardCards/DashCard';

// Chart options with dual Y-axes for both order count and total sales
const optionssalesummary = {
  chart: {
    id: 'basic-bar',
    fontFamily: '"Poppins", sans-serif',
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: ['#01c0c8', '#fb9678'], // Two colors for the two series
  fill: {
    opacity: 1
  },
  legend: {
    show: true, // Show legend for both datasets
  },
  markers: {
    size: 2,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      show: true,
      style: {
        colors: '#99abb4',
        fontSize: '12px',
        fontFamily: "'Nunito Sans', sans-serif",
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Order Count',
      },
      labels: {
        show: true,
        style: {
          colors: '#99abb4',
          fontSize: '12px',
          fontFamily: "'Nunito Sans', sans-serif",
        },
      },
    },
    {
      opposite: true, // Place the second Y-axis on the right
      title: {
        text: 'Total Sales (₹)',
      },
      labels: {
        show: true,
        style: {
          colors: '#99abb4',
          fontSize: '12px',
          fontFamily: "'Nunito Sans', sans-serif",
        },
        formatter: (value) => `₹${value.toLocaleString()}`, // Format in rupees
      },
    }
  ],
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    theme: 'dark',
  },
};

// Function to count sales and order count per month
const getSalesDataByMonth = (ordersData) => {
  const orderCountByMonth = new Array(12).fill(0); // Order count for each month
  const salesAmountByMonth = new Array(12).fill(0); // Sales amount for each month

  // Filter only completed orders
  const completedOrders = ordersData.filter(order => order.status === 'delivered');

  completedOrders.forEach(order => {
    const orderDate = new Date(order.updated_at);
    const month = orderDate.getMonth(); // Get the month (0 = January, 11 = December)

    // Count orders for the respective month
    orderCountByMonth[month] += 1;

    // Add sales amount to the respective month
    const totalAmount = parseFloat(order.total_amount || 0); // Ensure it's a number
    salesAmountByMonth[month] += totalAmount;
  });

  return { orderCountByMonth, salesAmountByMonth };
};

const YearlySales = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orders.success) {
      setOrdersData(orders.orders);
    }
  }, [orders]);

  useEffect(() => {
    // Calculate order counts and sales amounts by month
    const { orderCountByMonth, salesAmountByMonth } = getSalesDataByMonth(ordersData);

    // Update series data with both order counts and sales amounts
    setSeriesData([
      { name: 'Order Count', data: orderCountByMonth }, // For left Y-axis (Order Count)
      { name: 'Total Sales (₹)', data: salesAmountByMonth, type: 'line', yAxis: 1 } // For right Y-axis (Total Sales)
    ]);
  }, [ordersData]);

  return (
    <DashCard
      title="Monthly Sales"
      actions={
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-cyan"></i>
            <span className='fs-6 text-muted'>All Products</span>
          </div>
        </div>
      }
    >
      <div>
        <Chart options={optionssalesummary} series={seriesData} type="line" height="348" />
      </div>
    </DashCard>
  );
};

export default YearlySales;
