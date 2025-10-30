FROM registry.access.redhat.com/ubi10/httpd-24

USER 0

ADD html /tmp/src

RUN chown -R 1001:0 /tmp/src && \
    chmod -R ug+rwx /tmp/src && \
    rm -rf /tmp/src/{.git,README.md}

USER 1001

RUN /usr/libexec/s2i/assemble

CMD ["/usr/libexec/s2i/run"]
