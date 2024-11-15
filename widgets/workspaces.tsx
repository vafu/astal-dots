import { bind } from "../../../../../usr/share/astal/gjs"
import { range } from "../commons"
import { obtainService } from "../services/services"
import { Box, Label } from "./types"
import Gtk from "gi://Gtk?version=4.0"

export default function Workspaces() {
    const workspaces = obtainService("workspace")
    return <Box className="workspaces" >
        {workspaces.active_workroom().as(wr =>
            <Box>
                {range(workspaces.getWorkroom(wr).length).map(ws => {
                    const workspace = workspaces.getWorkroom(wr).getWorkspace(ws)
                    return <Label
                        valign={Gtk.Align.CENTER}
                        label={`${ws}`}
                        css_classes={bind(workspace, "changed").as(ws => [
                            ws.active ? "active" : "",
                            ws.urgent ? "urgent" : "",
                            ws.occupied ? "occupied" : ""
                        ].filter(s => s.length > 0))}
                    />
                })}
            </Box>
        )}
    </Box>
}
