const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const otlpCollectorEndpoint = 'http://ques-collector:55681/v1/traces';

const otlpExporter = new OTLPTraceExporter({
  url: otlpCollectorEndpoint,
  headers: {},
  concurrencyLimit: 10
});

const tracerProvider = new NodeTracerProvider({
  plugins: getNodeAutoInstrumentations(),
});
tracerProvider.addSpanProcessor(new BatchSpanProcessor(otlpExporter));

tracerProvider.register();

const { trace } = require('@opentelemetry/api');

module.exports = {
  trace,
};
