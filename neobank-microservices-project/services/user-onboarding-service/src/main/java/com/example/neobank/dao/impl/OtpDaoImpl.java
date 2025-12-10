package com.example.neobank.dao.impl;

import com.example.neobank.dao.OtpDao;
import com.example.neobank.entity.OtpEntry;
import com.example.neobank.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class OtpDaoImpl implements OtpDao
{
    @Autowired
    private OtpRepository repo;

    @Override
    public OtpEntry save(OtpEntry otp)
    {
        return repo.save(otp);
    }

    @Override
    public Optional<OtpEntry> findByPurposeAndRef(String purpose, String ref)
    {
        return repo.findByPurposeAndRef(purpose, ref);
    }

    @Override
    public void deleteByPurposeAndRef(String purpose, String ref)
    {
        repo.deleteByPurposeAndRef(purpose, ref);
    }

    @Override
    public void delete(OtpEntry otp)
    {
        repo.delete(otp);
    }
}