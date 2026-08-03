from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
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
        f"Threat Level: {investigation.risk_score}",
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

    doc.build(content)

    return filename
