import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetAllPatientAppointmentsQuery } from "../store/slices/patientApiSlice";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";

import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  EditRecurrenceMenu,
  ConfirmationDialog,
  AppointmentForm,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
const transformData = (data: any) => {
  const counts = (data || []).reduce((acc: any, appointment: any) => {
    const date = appointment.start_time.split("T")[0];
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  const sortedDates = Object.keys(counts).sort();
  const chartData = sortedDates.map((date) => [date, counts[date]]);

  return chartData;
};
const Dashboard = () => {
  const { data: appointments } = useGetAllPatientAppointmentsQuery("");
  const [chartOptions, setChartOptions] = useState<any>({
    title: {
      text: "Appointments per Day",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Number of Appointments",
      },
    },
    series: [
      {
        type: "column",
        name: "Appointments",
        data: [],
      },
    ],
  });
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [appointmentList, setAppointments] = useState([]);
  useEffect(() => {
    setAppointments(appointments);
    const data = transformData(appointments);
    setChartOptions((prevOptions: any) => ({
      ...prevOptions,
      series: [{ ...prevOptions.series[0], data }],
    }));
  }, [appointments]);

  const current = dayjs();
  let date = current.date();
  const currentDateChange = (currentDate: any) => {
    console.log(currentDate, "CURNET DAT")
    // setCurrentDate({ currentDate });
  };
  const [addedAppointment, addAppointment] = useState({})

  const apptData = (appointmentList || []).map(
    ({ start_time, end_time, patient }) => {
      const patientData = patient as any;
      const result = {
        startDate: start_time,
        endDate: end_time,
        title: `${patientData.first_name} ${patientData.last_name}`,
      };
      date += 1;
      if (date > 31) date = 1;
      return result;
    }
  );
const commitChanges = () => {

  }
  const changeAddedAppointment = (addedAppointment: any) => {
    addAppointment(addedAppointment)
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <Paper>
        <Scheduler data={apptData}>
          <ViewState
            defaultCurrentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
          />
          <WeekView startDayHour={8} endDayHour={19} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>
  );
};

export default Dashboard;
