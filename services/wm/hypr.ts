import { bind } from "../../../../../../usr/share/astal/gjs"
import { Services } from "../services"
import { WorkspaceService } from "../workspace"
import AstalHyprland from "gi://AstalHyprland?version=0.1"

const hypr = AstalHyprland.get_default()

export function bindHypr<S extends keyof Services>(type: S, service: Services[S]) {
    switch (type) {
        case "workspace": return bindWorkspace(service as Services[S])
    }
}


function bindWorkspace(workspaceService: WorkspaceService) {
    const getWs = (int: number) => {
        const wr = Math.floor(int / 10)
        const ws = int % 10
        return workspaceService.getWorkroom(wr).getWorkspace(ws)
    }

    let last = getWs(hypr.focusedWorkspace.id)
    last.active = true

    bind(hypr, "focusedWorkspace").subscribe((w) => {
        last.active = false
        last = getWs(w.id)
        last.active = true
        last.urgent = false
    })

    hypr.workspaces

    // hypr.get_workspaces().forEach(w =>
    //     getWs(w.id)
    //         .occupied =
    //     w.clients.length > 0
    // )
    //
    // hypr.connect("client-added", s => {
    //     hypr.workspaces.forEach(w => getWs(w.id).occupied = w.clients.length > 0)
    // })
    // hypr.connect("client-removed", s => {
    //     hypr.workspaces.forEach(w => getWs(w.id).occupied = w.clients.length > 0)
    // })
    // hypr.connect("urgent", (s, id) => {
    //     const wsid = s.workspaces.find(w => w.lastClient === id)?.id
    //     if (wsid)
    //         getWs(wsid).urgent.set(true)
    // })
}
