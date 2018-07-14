FROM ustw/frontend-app

# Create app directory
WORKDIR /usr/src/app

EXPOSE 3000
CMD ["./runCmdInDocker.sh"]


