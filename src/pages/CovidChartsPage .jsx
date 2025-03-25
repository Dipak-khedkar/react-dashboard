import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const CovidChartsPage = () => {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);

  // Fetching data from API
  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await fetch(
          "https://api.covidtracking.com/v1/us/daily.json"
        );
        const data = await response.json();
        setCovidData(data);
        setLoading(false);
        aggregateMonthlyData(data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchCovidData();
  }, []);

  // Function to aggregate data by month and format date as "Mar-2020"
  const aggregateMonthlyData = (data) => {
    const monthData = {};

    data.forEach((item) => {
      const year = item.date.toString().slice(0, 4);
      const month = item.date.toString().slice(4, 6);
      const monthName = new Date(`${year}-${month}-01`).toLocaleString(
        "default",
        { month: "short" }
      );
      const formattedDate = `${monthName}-${year}`;

      if (!monthData[formattedDate]) {
        monthData[formattedDate] = {
          positive: 0,
          negative: 0,
          deaths: 0,
          totalCases: 0,
          hospitalizations: 0,
        };
      }

      monthData[formattedDate].positive += item.positive || 0;
      monthData[formattedDate].negative += item.negatives || 0;
      monthData[formattedDate].deaths += item.death || 0;
      monthData[formattedDate].totalCases +=
        item.positive + (item.negatives || 0);
      monthData[formattedDate].hospitalizations += item.hospitalized || 0;
    });

    const aggregatedData = Object.keys(monthData).map((key) => ({
      month: key,
      ...monthData[key],
    }));

    setMonthlyData(aggregatedData);
  };

  // Calculate total numbers for the current month
  const totalNumbers = {
    totalCases: monthlyData.reduce((total, item) => total + item.totalCases, 0),
    totalDeaths: monthlyData.reduce((total, item) => total + item.deaths, 0),
    totalHospitalizations: monthlyData.reduce(
      (total, item) => total + item.hospitalizations,
      0
    ),
  };

  // Prepare data for Line chart
  const lineChartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Total Cases",
        data: monthlyData.map((item) => item.totalCases),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
      {
        label: "Deaths",
        data: monthlyData.map((item) => item.deaths),
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        tension: 0.1,
      },
    ],
  };

  // Prepare data for Bar chart
  const barChartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Positive Cases",
        data: monthlyData.map((item) => item.positive),
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Negative Cases",
        data: monthlyData.map((item) => item.negative),
        backgroundColor: "rgba(255,99,132,0.4)",
      },
      {
        label: "Deaths",
        data: monthlyData.map((item) => item.deaths),
        backgroundColor: "rgba(255,159,64,0.4)",
      },
      {
        label: "Hospitalizations",
        data: monthlyData.map((item) => item.hospitalizations),
        backgroundColor: "rgba(153,102,255,0.4)",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Header */}
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            COVID-19 Data - USA (Month-wise)
          </Typography>

          {/* Loading Indicator */}
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {/* Summary Box with Total Numbers */}
              <Grid
                container
                spacing={3}
                sx={{
                  m: 3,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: "skyblue",
                }}
              >
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Total Cases</Typography>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {totalNumbers.totalCases.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Total Deaths</Typography>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {totalNumbers.totalDeaths.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        Total Hospitalizations
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {totalNumbers.totalHospitalizations.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Line Chart - Total Cases and Deaths */}
              <Grid
                container
                spacing={3}
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} lg={10}>
                  <Paper sx={{ padding: 2, marginBottom: 3 }}>
                    <Typography variant="h6">
                      Total Cases & Deaths (Line Chart)
                    </Typography>
                    <Line data={lineChartData} />
                  </Paper>
                </Grid>
              </Grid>

              {/* Bar Chart - Positive, Negative, Deaths, Hospitalizations & Discharges */}
              <Grid
                container
                spacing={3}
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} lg={10}>
                  <Paper
                    sx={{
                      padding: 2,
                      marginBottom: 3,
                    }}
                  >
                    <Typography variant="h6">COVID Data (Bar Chart)</Typography>
                    <Bar data={barChartData} />
                  </Paper>
                </Grid>
              </Grid>

              {/* Month-wise Data Table (Only for Large Screens) */}
              <Typography
                variant="h6"
                sx={{
                  display: {
                    p: 2,
                    xs: "none",
                    lg: "block",
                    backgroundColor: "skyblue",
                  },
                }}
              >
                Month-wise Data
              </Typography>

              {/* Data Table - Month-wise COVID Data (Only for Large Screens) */}
              <Grid
                container
                spacing={3}
                sx={{ mb: 3, display: { xs: "none", lg: "block" } }}
              >
                <Grid item xs={12} md={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Month</TableCell>
                          <TableCell>Total Cases</TableCell>
                          <TableCell>Positive Cases</TableCell>
                          <TableCell>Negative Cases</TableCell>
                          <TableCell>Deaths</TableCell>
                          <TableCell>Hospitalizations</TableCell>
                          <TableCell>Discharged</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthlyData.map((item) => (
                          <TableRow key={item.month}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell>{item.totalCases}</TableCell>
                            <TableCell>{item.positive}</TableCell>
                            <TableCell>{item.negative}</TableCell>
                            <TableCell>{item.deaths}</TableCell>
                            <TableCell>{item.hospitalizations}</TableCell>
                            <TableCell>{item.discharged}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CovidChartsPage;
