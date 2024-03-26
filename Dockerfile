FROM docker.phonepe.com:5000/pp-focal-nodejs-18
LABEL MAINTAINER "bharath.kumar1@phonepe.com"
VOLUME /var/log/
WORKDIR /usr/src/app



ENV MOUNTEBANK_VERSION=2.4.0
ENV PRIMSA_VERSION=4.8.0
ARG dbUrl
ENV DATABASE_URL=${dbUrl}

RUN npm install -g prisma@${PRIMSA_VERSION} --production

COPY . .


# 'environment' variable to be passed at build time from docker command
ARG environment

RUN npm install


# This condition doesn't work for now. But it helps in asking for environment.
RUN if [ "$environment" = "" ] ; then echo 'Environment not provided... Use command docker build --build-arg environment=<environment>'; else echo Environment is $environment ; fi

# Set environment variable.
ENV NODE_ENV=${environment}

ENV LOG_PATH="/var/log/"
RUN chmod -R a+x /var/log/


# Print environment variables
RUN printenv

EXPOSE 3000
EXPOSE 2520
EXPOSE 2525
EXPOSE 9000
EXPOSE 9001


RUN echo ${environment}

CMD ["sh", "-c", "npm run start"]

