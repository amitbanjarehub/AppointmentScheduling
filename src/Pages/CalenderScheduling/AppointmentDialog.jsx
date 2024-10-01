import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";

const AppointmentDialog = ({ open, onClose, selectedDateAppointments }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Appointments on Selected Date</DialogTitle>
      <DialogContent>
        {selectedDateAppointments.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Time</strong>
                </TableCell>
                <TableCell>
                  <strong>User</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDateAppointments.map((appointment) => (
                <TableRow key={appointment.appointment_id}>
                  <TableCell>{appointment.title}</TableCell>
                  <TableCell>
                    {moment(appointment.start).format("hh:mm A")} -{" "}
                    {moment(appointment.end).format("hh:mm A")}
                  </TableCell>
                  <TableCell>{appointment.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No appointments on this date.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
