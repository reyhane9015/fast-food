"use client";

import { useState , useEffect , useContext } from 'react';
import UserTabs from '@/components/ui/UserTabs';
import { CartContext } from '@/components/AppContext';
import { parseISO, isSameDay, isSameWeek, isSameMonth, startOfDay, startOfWeek, startOfMonth } from 'date-fns';
import DashboardTop from '@/components/dashboard/DashboardTop';
import DashboardBests from '@/components/dashboard/DashboardBests';
import { useSession } from 'next-auth/react';

import withAuth from './../../../libs/withAuth';

function DashboardPage() {

  const session = useSession();
  const status = session.status;
    
  const[orders , setOrders] = useState([]);
  const[isAdmin , setIsAdmin] = useState(true);
  const[dataFetched , setDataFetched] = useState(false);

  const [todayIncome, setTodayIncome] = useState(0);
  const [thisWeekIncome, setThisWeekIncome] = useState(0);
  const [thisMonthIncome, setThisMonthIncome] = useState(0);

  const [todayOrderCount, setTodayOrderCount] = useState(0);
  const [thisWeekOrderCount, setThisWeekOrderCount] = useState(0);
  const [thisMonthOrderCount, setThisMonthOrderCount] = useState(0);

  const [todayOrderPercentage, setTodayOrderPercentage] = useState(0);
  const [thisWeekOrderPercentage, setThisWeekOrderPercentage] = useState(0);
  const [thisMonthOrderPercentage, setThisMonthOrderPercentage] = useState(0);

  const [itemSalesCount, setItemSalesCount] = useState([]);
  const [itemSalesCountPercentage, setItemSalesCountPercentage] = useState([]);

  const [cSalesCount, setcSalesCount] = useState({});
  const [customerCount, setCustomerCount] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);


  //  fetch all orders
  useEffect(() => { 
    fetch('/api/orders').then(response => {
        response.json().then(orders => {
          setOrders(orders);
          console.log("orders are:" , orders);
          
          setDataFetched(true);
        })
    })
  },[]);



  // calc incomes with date-fns
  useEffect(() => {

    if(!orders) return;

    const today = startOfDay(new Date());
    const thisWeekStart = startOfWeek(new Date());
    const thisMonthStart = startOfMonth(new Date());

    let todayIncomeTemp = 0;
    let thisWeekIncomeTemp = 0;
    let thisMonthIncomeTemp = 0;

    orders.forEach(order => {

      const createdAt = parseISO(order.createdAt);

      if(order.paid) {

        if(isSameDay(createdAt, today)) {
          todayIncomeTemp += order.totalPrice;
        }

        if(isSameWeek(createdAt , thisWeekStart)) {
          thisWeekIncomeTemp += order.totalPrice;
        }

        if(isSameMonth(createdAt , thisMonthStart)) {
          thisMonthIncomeTemp += order.totalPrice;
        }

      }

    });

    setTodayIncome(todayIncomeTemp);
    setThisWeekIncome(thisWeekIncomeTemp);
    setThisMonthIncome(thisMonthIncomeTemp);

    } , [orders]);


  // calc order count with date-fns
  useEffect(() => {

    if(!orders) return;

    const today = startOfDay(new Date());
    const thisWeekStart = startOfWeek(new Date());
    const thisMonthStart = startOfMonth(new Date());

    let totalOrderCount = orders.length;

    let todayOrderCount = 0;
    let thisWeekOrderCount = 0;
    let thisMonthOrderCount = 0;

    orders.forEach(order => {

      const createdAt = parseISO(order.createdAt);

      if(isSameDay(createdAt, today)) {
        todayOrderCount ++;
      }

      if(isSameWeek(createdAt , thisWeekStart)) {
        thisWeekOrderCount ++;
      }

      if(isSameMonth(createdAt , thisMonthStart)) {
        thisMonthOrderCount ++;
      }
      setTodayOrderCount(todayOrderCount);
      setThisWeekOrderCount(thisWeekOrderCount);
      setThisMonthOrderCount(thisMonthOrderCount);

      const todayerPercentage = (todayOrderCount / totalOrderCount) * 100;
      const thisWeekerPercentage = (thisWeekOrderCount / totalOrderCount) * 100;
      const thisMontherPercentage = (thisMonthOrderCount / totalOrderCount) * 100;

      setTodayOrderPercentage(todayerPercentage);
      setThisWeekOrderPercentage(thisWeekerPercentage);
      setThisMonthOrderPercentage(thisMontherPercentage);

    });

    } , [orders]);



  // items sales count
  useEffect(() => {

    if(!orders) return;

    let totalOrderCount = orders.length;

    const salesCount = {};

    orders.forEach(order => {
      order.cartProducts.forEach(product => {

        if (!salesCount[product.name]) {
          salesCount[product.name] = 0;
        }

        salesCount[product.name]++;
      })   
    })

    const salesCountArray = Object.entries(salesCount);
    salesCountArray.sort((a, b) => b[1] - a[1]);

    // console.log("salescount:" , salesCount);
    // console.log("salescountArray:" , salesCountArray);

    setItemSalesCount(salesCountArray);

    // console.log("itemSalesCount" , itemSalesCount);

    // percentage
    const salesCountPercentageArray = salesCountArray.map(([item, count]) => {
      const percentage = (count / totalOrderCount) * 100;
      return [item, percentage.toFixed(2)]; // Return item and rounded percentage to 2 decimal places
    });

    console.log("salescount percentages:" , salesCountPercentageArray);

    setItemSalesCountPercentage(salesCountPercentageArray);


  } , [orders]);


  // country sales statistics
  useEffect(()=> {

    if(!orders) return;

    let totalOrderCount = orders.length;

    const countryCount = {};
    orders.forEach( order => {
        order.user.forEach(u => {

          const normalizedCountry = u?.country?.toLowerCase();

          if(!countryCount[normalizedCountry]) {
            countryCount[normalizedCountry] = 0;
          }

          countryCount[normalizedCountry]++;
        })
    })

    const countryPercentage = {};
    for(const [country, count] of Object.entries(countryCount)) {
      const percentage = (count / totalOrderCount) * 100;
      countryPercentage[country] = percentage.toFixed(2);
    }
    setcSalesCount(countryPercentage);

  } ,[orders]);


  // best sellers statistics
  useEffect(() => {
    if (!orders) return;

    const customerCount = {};

 
    orders.forEach(order => {
        const userEmail = order.userEmail;


        if (!customerCount[userEmail]) {
            customerCount[userEmail] = 0;
        }
        customerCount[userEmail]++;
    });


    const customerCountArray = Object.entries(customerCount);
    customerCountArray.sort((a, b) => b[1] - a[1]);

    setCustomerCount(customerCountArray);

}, [orders]);


  // card info
  useEffect(() => {
    if (!orders) return;

    let cardInfoArray = [];

    orders.forEach(order => {
      if (order.cardInfo) {
        cardInfoArray.push(order.cardInfo);
        // console.log("card" , cardInfoArray);
      }
    });

    setCardInfo(cardInfoArray.reverse());

  }, [orders]);



  if(status == "unauthenticated") {
    return redirect ("/login");
  }



  return (

    <section>
    {/* <section className="bg-light-background dark:bg-dark-background min-h-screen"> */}
      
      {/* <UserTabs isAdmin={isAdmin} /> */}

    {/*      
      {!dataFetched && <div 
                          className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
                              Loading...
                          </div>
      } */}


    {status == "authenticated" &&
        <>
          <DashboardTop todayIncome={todayIncome} thisWeekIncome={thisWeekIncome} thisMonthIncome={thisMonthIncome}
                        todayOrderCount={todayOrderCount} thisWeekOrderCount={thisWeekOrderCount} 
                        thisMonthOrderCount={thisMonthOrderCount} todayOrderPercentage={todayOrderPercentage}
                        thisWeekOrderPercentage={thisWeekOrderPercentage} thisMonthOrderPercentage={thisMonthOrderPercentage}
          />



          <DashboardBests itemSalesCount={itemSalesCount} cSalesCount={cSalesCount} customerCount={customerCount} cardInfo={cardInfo} itemSalesCountPercentage={itemSalesCountPercentage} />
        </>

    }

    </section>
  )
}

export default withAuth(DashboardPage)
