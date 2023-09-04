import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import CreatePlaylist from "./createPlaylist";

export default function BasicDemo() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <CreatePlaylist></CreatePlaylist>
        </div>
    )
}