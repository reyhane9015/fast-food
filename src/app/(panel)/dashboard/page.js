"use client";

import { useState, useEffect } from "react";
import {
  parseISO,
  isSameDay,
  isSameWeek,
  isSameMonth,
  startOfDay,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import DashboardTop from "@/components/dashboard/DashboardTop";
import DashboardBests from "@/components/dashboard/DashboardBests";
import { useSession } from "next-auth/react";
import withAuth from "./../../../libs/withAuth";

function DashboardPage() {
  const session = useSession();
  const status = session.status;

  const [orders, setOrders] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
        setDataFetched(true);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setDataFetched(false);
      }
    };

    fetchOrders();
  }, []);

  // calc incomes with date-fns
  useEffect(() => {
    if (!orders) return;

    try {
      const today = startOfDay(new Date());
      const thisWeekStart = startOfWeek(new Date());
      const thisMonthStart = startOfMonth(new Date());

      let todayIncomeTemp = 0;
      let thisWeekIncomeTemp = 0;
      let thisMonthIncomeTemp = 0;

      orders.forEach((order) => {
        const createdAt = parseISO(order.createdAt);

        if (order.paid) {
          if (isSameDay(createdAt, today)) {
            todayIncomeTemp += order.totalPrice;
          }

          if (isSameWeek(createdAt, thisWeekStart)) {
            thisWeekIncomeTemp += order.totalPrice;
          }

          if (isSameMonth(createdAt, thisMonthStart)) {
            thisMonthIncomeTemp += order.totalPrice;
          }
        }
      });

      setTodayIncome(todayIncomeTemp);
      setThisWeekIncome(thisWeekIncomeTemp);
      setThisMonthIncome(thisMonthIncomeTemp);
    } catch (error) {
      console.error("Error while calculating income:", error);
    }
  }, [orders]);

  // calc order count with date-fns
  useEffect(() => {
    if (!orders) return;

    try {
      const today = startOfDay(new Date());
      const thisWeekStart = startOfWeek(new Date());
      const thisMonthStart = startOfMonth(new Date());

      let totalOrderCount = orders.length;

      let todayOrderCount = 0;
      let thisWeekOrderCount = 0;
      let thisMonthOrderCount = 0;

      orders.forEach((order) => {
        const createdAt = parseISO(order.createdAt);

        if (isSameDay(createdAt, today)) {
          todayOrderCount++;
        }

        if (isSameWeek(createdAt, thisWeekStart)) {
          thisWeekOrderCount++;
        }

        if (isSameMonth(createdAt, thisMonthStart)) {
          thisMonthOrderCount++;
        }
        setTodayOrderCount(todayOrderCount);
        setThisWeekOrderCount(thisWeekOrderCount);
        setThisMonthOrderCount(thisMonthOrderCount);

        const todayerPercentage = (todayOrderCount / totalOrderCount) * 100;
        const thisWeekerPercentage =
          (thisWeekOrderCount / totalOrderCount) * 100;
        const thisMontherPercentage =
          (thisMonthOrderCount / totalOrderCount) * 100;

        setTodayOrderPercentage(todayerPercentage);
        setThisWeekOrderPercentage(thisWeekerPercentage);
        setThisMonthOrderPercentage(thisMontherPercentage);
      });
    } catch (error) {
      console.error("Error while calculating order count:", error);
    }
  }, [orders]);

  // items sales count
  useEffect(() => {
    if (!orders) return;

    try {
      let totalOrderCount = orders.length;

      const salesCount = {};

      orders.forEach((order) => {
        order.cartProducts.forEach((product) => {
          if (!salesCount[product.name]) {
            salesCount[product.name] = 0;
          }

          salesCount[product.name]++;
        });
      });

      const salesCountArray = Object.entries(salesCount);
      salesCountArray.sort((a, b) => b[1] - a[1]);

      setItemSalesCount(salesCountArray);

      // percentage
      const salesCountPercentageArray = salesCountArray.map(([item, count]) => {
        const percentage = (count / totalOrderCount) * 100;
        return [item, percentage.toFixed(2)]; // Return item and rounded percentage to 2 decimal places
      });

      setItemSalesCountPercentage(salesCountPercentageArray);
    } catch (error) {
      console.error("Error while processing item sales count:", error);
    }
  }, [orders]);

  // country sales statistics
  useEffect(() => {
    if (!orders) return;

    try {
      let totalOrderCount = orders.length;

      const countryCount = {};
      orders.forEach((order) => {
        order.user.forEach((u) => {
          const normalizedCountry = u?.country?.toLowerCase();

          if (!countryCount[normalizedCountry]) {
            countryCount[normalizedCountry] = 0;
          }

          countryCount[normalizedCountry]++;
        });
      });

      const countryPercentage = {};
      for (const [country, count] of Object.entries(countryCount)) {
        const percentage = (count / totalOrderCount) * 100;
        countryPercentage[country] = percentage.toFixed(2);
      }
      setcSalesCount(countryPercentage);
    } catch (error) {
      console.error("Error while processing count sale:", error);
    }
  }, [orders]);

  // best sellers statistics
  useEffect(() => {
    if (!orders) return;

    try {
      const customerCount = {};

      orders.forEach((order) => {
        const userEmail = order.userEmail;

        if (!customerCount[userEmail]) {
          customerCount[userEmail] = 0;
        }
        customerCount[userEmail]++;
      });

      const customerCountArray = Object.entries(customerCount);
      customerCountArray.sort((a, b) => b[1] - a[1]);

      setCustomerCount(customerCountArray);
    } catch (error) {
      console.error("Error while processing best sellers:", error);
    }
  }, [orders]);

  // card info
  useEffect(() => {
    if (!orders) return;

    try {
      let cardInfoArray = [];

      orders.forEach((order) => {
        if (order.cardInfo) {
          cardInfoArray.push(order.cardInfo);
        }
      });

      setCardInfo(cardInfoArray.reverse());
    } catch (error) {
      console.error("Error while processing card info:", error);
    }
  }, [orders]);

  if (status == "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section>
      {status == "authenticated" && (
        <>
          <DashboardTop
            todayIncome={todayIncome}
            thisWeekIncome={thisWeekIncome}
            thisMonthIncome={thisMonthIncome}
            todayOrderCount={todayOrderCount}
            thisWeekOrderCount={thisWeekOrderCount}
            thisMonthOrderCount={thisMonthOrderCount}
            todayOrderPercentage={todayOrderPercentage}
            thisWeekOrderPercentage={thisWeekOrderPercentage}
            thisMonthOrderPercentage={thisMonthOrderPercentage}
          />

          <DashboardBests
            itemSalesCount={itemSalesCount}
            cSalesCount={cSalesCount}
            customerCount={customerCount}
            cardInfo={cardInfo}
            itemSalesCountPercentage={itemSalesCountPercentage}
          />
        </>
      )}
    </section>
  );
}

export default withAuth(DashboardPage);
