import { useEffect, useState } from "react";

import { getInvestigationEvents } from "../api/investigationApi";

function Timeline({ investigationId }) {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!investigationId) {
            return;
        }

        async function loadTimeline() {

            try {

                const data = await getInvestigationEvents(
                    investigationId
                );

                setEvents(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadTimeline();

    }, [investigationId]);

    if (loading) {
        return <p>Loading timeline...</p>;
    }

    if (events.length === 0) {
        return <p>No timeline events.</p>;
    }

    return (

        <div>

            <h3>Investigation Timeline</h3>

            {events.map((event) => (

                <div
                    key={event.id}
                    style={{
                        borderLeft: "3px solid #4CAF50",
                        paddingLeft: "12px",
                        marginBottom: "20px"
                    }}
                >

                    <strong>
                        {event.event_type}
                    </strong>

                    <p>
                        {event.description}
                    </p>

                    <small>
                        {new Date(
                            event.created_at
                        ).toLocaleString()}
                    </small>

                </div>

            ))}

        </div>

    );

}

export default Timeline;
