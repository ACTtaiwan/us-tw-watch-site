FROM tw-web-prod-i

ENV NODE_ENV=development

VOLUME ["/var/app"]

CMD ["./dev.sh"]
