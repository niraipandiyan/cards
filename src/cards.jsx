import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import details from "./details.json";

export default function CardComp() {
  const groupedData = details.reduce((res, curr) => {
    if (!res[curr.instance_id]) {
      res[curr.instance_id] = {
        instance_id: curr.instance_id,
        region: curr.region,
        instance_name: curr.instance_name,
        instance_type: curr.instance_type,
        state: curr.state,
        last_activity_time: curr.last_activity_time,
      };
    }
    res[curr.instance_id][curr.metric_type] = curr.average_utilization;
    return res;
  }, {});

  const rowData = Object.values(groupedData);

  return (
    <div style={{padding:"45px"}}>
      <Grid container spacing={3}>
        {rowData.map((row, index) => (
          <Grid item key={row.instance_id} xs={12} sm={6} md={4} lg={3}>
            <Card
              style={{
                border: "1px solid #CB5EDC",
                borderRadius: "9px",
                backgroundImage: "linear-gradient(to bottom left, #F0EBE3 , #F2D7D9 )",
                boxShadow: "5px 2px 4px rgba(20, 20, 10, 10)",
                position: "relative", // Added for positioning the view button
                marginRight:"15px",
                marginLeft:"15px"
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: "bold", textDecoration: "capitalize", marginBottom: "10px" }}>
                  {row.instance_name || "Not Available"}
                </Typography>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    variant="outlined"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#000000",
                      backgroundColor: row.state === "running" ? "#B0C5A4" : row.state === "stopped" ? "#D37676" : "#FFFFFF",
                      height: "26px",
                      width: "110px",
                      borderRadius: "999px",
                      border: "0.5px solid #9BB0C1",
                    }}
                  >
                    {row.state}
                  </Button>
                </div>
                <Typography variant="h6" style={{ marginBottom: "5px" }}>Metrics</Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginBottom: "5px" }}>
                  CPU Utilization: {row.cpu || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginBottom: "5px" }}>
                  Disk Utilization: {row.disk || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginBottom: "5px" }}>
                  Memory Utilization: {row.memory || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
