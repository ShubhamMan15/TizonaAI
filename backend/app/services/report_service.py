from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf_report(investigation):

    filename = f"investigation_{investigation.id}.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "TizonaAI Threat Investigation Report",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 20))

    fields = [
        f"Case ID: {investigation.id}",
        f"IOC: {investigation.ioc}",
        f"Type: {investigation.ioc_type}",
        f"Threat Level Score: {investigation.risk_score}",
        f"Risk Score: {investigation.risk_score}/100",
        f"Reputation: {investigation.reputation}",
        f"Source: {investigation.source}",
        f"Pulse Count: {investigation.pulse_count}",
        f"Created: {investigation.created_at}",
    ]

    for field in fields:
        content.append(
            Paragraph(
                field,
                styles["Normal"]
            )
        )

        content.append(
            Spacer(1, 10)
        )

    # MITRE ATT&CK Section
    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "MITRE ATT&CK Mapping",
            styles["Heading2"]
        )
    )

    content.append(
        Spacer(1, 10)
    )

    if investigation.mitre_attack:

        for technique in investigation.mitre_attack:

            content.append(
                Paragraph(
                    f"<b>{technique.get('technique_id')}</b> - "
                    f"{technique.get('technique_name')}",
                    styles["Normal"]
                )
            )

            content.append(
                Paragraph(
                    technique.get("description", ""),
                    styles["Normal"]
                )
            )

            content.append(
                Spacer(1, 8)
            )

    else:

        content.append(
            Paragraph(
                "No MITRE ATT&CK mappings available.",
                styles["Normal"]
            )
        )

    doc.build(content)

    return filename
