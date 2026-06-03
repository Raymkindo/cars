<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f6f9fc;
            color: #333333;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            background-color: #f6f9fc;
            padding: 30px 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e8e8e8;
        }
        .header {
            background: linear-gradient(135deg, #1B3462, #ED1C24);
            padding: 24px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
        .content {
            padding: 30px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 16px;
        }
        .message-body {
            font-size: 15px;
            color: #4a4a4a;
            white-space: pre-wrap;
            margin-bottom: 30px;
        }
        .original-inquiry-box {
            background-color: #f8fafc;
            border-left: 4px solid #1B3462;
            padding: 20px;
            border-radius: 4px;
            margin-top: 30px;
            font-size: 13px;
        }
        .original-title {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
            color: #64748b;
            letter-spacing: 0.05em;
            margin-bottom: 10px;
        }
        .original-meta {
            margin-bottom: 10px;
            color: #475569;
        }
        .original-text {
            color: #334155;
            font-style: italic;
            white-space: pre-wrap;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        .footer a {
            color: #1B3462;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>{{ config('app.name', 'Kenase Japan') }}</h1>
            </div>
            <div class="content">
                <div class="greeting">Dear {{ $inquiry->name }},</div>
                
                <div class="message-body">
                    {{ $replyMessage }}
                </div>
                
                <p>Best regards,<br><strong>Customer Care Team</strong><br>{{ config('app.name', 'Kenase Japan') }}</p>
                
                <div class="original-inquiry-box">
                    <div class="original-title">Original Inquiry Details</div>
                    <div class="original-meta">
                        <strong>Topic:</strong> {{ $inquiry->inquiry_type }}<br>
                        @if($inquiry->car_of_interest)
                            <strong>Vehicle of Interest:</strong> {{ $inquiry->car_of_interest }}<br>
                        @endif
                        <strong>Date Submitted:</strong> {{ $inquiry->created_at->format('M d, Y h:i A') }}
                    </div>
                    <div class="original-text">"{{ $inquiry->message }}"</div>
                </div>
            </div>
            <div class="footer">
                <p>This is a reply to your inquiry submitted on our website.</p>
                <p>Visit us at <a href="{{ config('app.url') }}">{{ config('app.url') }}</a></p>
            </div>
        </div>
    </div>
</body>
</html>
